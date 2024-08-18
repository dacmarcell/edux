import prisma from "../../prisma/prisma-client";

export const readCourses = async () => {
  const courses = await prisma.courses.findMany({
    include: {
      students: true,
    },
  });
  return courses;
};

export const createCourses = async (name: string) => {
  const doesCourseExists = await prisma.courses.findUnique({
    where: { name },
  });

  if (doesCourseExists) {
    return {
      data: { message: "Course already exists", error: true },
      status: 400,
    };
  }

  const course = await prisma.courses.create({ data: { name } });
  return { data: { message: course, error: false }, status: 201 };
};

export const updateCourses = async (name: string, id: string) => {
  const course = await prisma.courses.update({ where: { id }, data: { name } });
  return { data: { message: course, error: false }, status: 200 };
};

export const removeCourses = async (id: string) => {
  const remove = await prisma.courses.delete({ where: { id } });
  return { data: remove, status: 204 };
};

export const findCourseByName = async (name: string) => {
  return await prisma.courses.findUnique({
    where: { name },
  });
};

const courseService = {
  readCourses,
  createCourses,
  updateCourses,
  removeCourses,
};

export default courseService;
