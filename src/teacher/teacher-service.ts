import { Teacher } from "@prisma/client";
import prisma from "../../prisma/prisma-client";
import { findCourseByName } from "../course/course-service";
import { findStudentByEmail } from "../student/student-service";
import { teacherValidationSchema } from "../utils/validation";
import { CreateTeacher, UpdateTeacher } from "./teacher.interfaces";

export const validateTeacher = (teacher: Partial<Teacher>) => {
  const validation = teacherValidationSchema.safeParse(teacher);
  return validation;
};

export const readTeacher = async () => {
  const teacher = await prisma.teacher.findMany({
    include: {
      courses: true,
    },
  });
  return teacher;
};

export const createTeacher = async (
  { name, email, password, isCoordinator }: CreateTeacher,
  courseName: string
) => {
  const validation = validateTeacher({ name, email, password, isCoordinator });

  if (!validation.success) {
    return { data: { message: validation, error: true }, status: 400 };
  }

  const teacherExists = await findTeacherByEmail(email);
  const studentExists = await findStudentByEmail(email);
  const courseExists = await findCourseByName(courseName);

  if (!courseExists) {
    return {
      data: { message: "Course does not exists", error: true },
      status: 400,
    };
  }

  if (teacherExists || studentExists) {
    return {
      data: { message: "Email is already used", error: true },
      status: 400,
    };
  }

  const create = await prisma.teacher.create({
    data: {
      name,
      email,
      password,
      isCoordinator,
      courses: {
        connect: { name: courseName },
      },
    },
  });

  return { data: { message: create, error: false }, status: 201 };
};

const generateTeacher = (teacher: CreateTeacher | UpdateTeacher) => ({
  name: teacher.name,
  email: teacher.email,
  password: teacher.password,
  isCoordinator: teacher.isCoordinator,
});

export const updateTeacher = async (
  teacher: UpdateTeacher,
  id: string
) => {
  const newTeacher = generateTeacher(teacher);
  const { success, error } = validateTeacher(newTeacher);
  if (!success) {
    return { data: { message: error, error: true }, status: 400 };
  }

  const updateTeacher = await prisma.teacher.update({
    where: { id },
    data: newTeacher,
  });

  return { data: { message: updateTeacher, error: false }, status: 200 };
};

export const removeTeacher = async (id: string) => {
  const removeTeacher = await prisma.teacher.delete({ where: { id } });
  return { data: removeTeacher, status: 204 };
};

export const findTeacherByID = async (id: string) => {
  const teacher = await prisma.teacher.findUnique({
    where: { id },
  });
  return teacher;
};

export const findTeacherByEmail = async (email: string) => {
  const teacher = await prisma.teacher.findUnique({
    where: { email },
  });
  return teacher;
};

const teacherService = {
  readTeacher,
  createTeacher,
  updateTeacher,
  removeTeacher,
};

export default teacherService;
