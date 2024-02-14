import { studentValidationSchema } from "../utils/validation";
import { Student } from "../utils/types";
import prisma from "../../prisma/prisma-client";

const emailVerification = async (email: string) => {
  const emailExists = await prisma.student.findUnique({ where: { email } });
  return emailExists;
};

export const readStudents = async () => {
  const students = await prisma.student.findMany({
    include: {
      courses: true,
    },
  });
  return students;
};

export const createStudent = async (student: Student) => {
  const data = {
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    password: student.password,
  };

  const validation = studentValidationSchema.safeParse(data);

  if (!validation.success) {
    return { data: { message: validation, error: true }, status: 400 };
  }

  const emailExists = await emailVerification(student.email);

  if (emailExists) {
    return {
      data: { message: "Email is already used", error: true },
      status: 400,
    };
  }

  const createStudent = await prisma.student.create({ data });

  return { data: { message: createStudent, error: false }, status: 201 };
};

export const updateStudent = async (studentData: Student, id: string) => {
  const data = {
    firstName: studentData.firstName,
    lastName: studentData.lastName,
    email: studentData.email,
    password: studentData.password,
  };

  const validation = studentValidationSchema.safeParse(data);

  if (!validation.success) {
    return { data: { message: validation, error: true }, status: 400 };
  }

  const student = await prisma.student.findUnique({
    where: { id },
  });

  if (!student) {
    return { data: { message: "Student Not Found", error: true }, status: 404 };
  }

  const updateStudent = await prisma.student.update({
    where: { id },
    data,
  });

  return { data: { message: updateStudent, error: false }, status: 200 };
};

export const deleteStudent = async (id: string) => {
  await prisma.student.delete({ where: { id } });
  return { data: null, status: 204 };
};

const studentService = {
  readStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};

export default studentService;
