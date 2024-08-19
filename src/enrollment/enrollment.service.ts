import prisma from "../../prisma/prisma-client";

export const enrollmentByID = async (studentID: string, courseID: string) => {
  const enroll = await prisma.student.update({
    where: { id: studentID },
    data: {
      courses: {
        connect: { id: courseID },
      },
    },
  });
  return enroll;
};

export const enrollmentByEmail = async (
  studentEmail: string,
  courseName: string
) => {
  const enroll = await prisma.student.update({
    where: { email: studentEmail },
    data: {
      courses: {
        connect: { name: courseName },
      },
    },
  });
  return enroll;
};

export const unenrollmentByID = async (studentID: string, courseID: string) => {
  const unenroll = await prisma.student.update({
    where: { id: studentID },
    data: {
      courses: {
        disconnect: { id: courseID },
      },
    },
  });
  return unenroll;
};

export const unenrollmentByEmail = async (
  studentEmail: string,
  courseName: string
) => {
  const enroll = await prisma.student.update({
    where: { email: studentEmail },
    data: {
      courses: {
        disconnect: { name: courseName },
      },
    },
  });
  return enroll;
};

//////////////////////// Teacher EnrollMents /////////////////////////////

export const enrollCourseForTeacher = async (
  teacherEmail: string,
  courseName: string
) => {
  const doesTeacherEmailExists = await prisma.teacher.findUnique({
    where: { email: teacherEmail },
  });

  if (!doesTeacherEmailExists)
    return {
      data: { message: "Teacher email not found", error: true },
      status: 404,
    };

  const enroll = await prisma.teacher.update({
    where: { email: teacherEmail },
    data: {
      courses: {
        connect: { name: courseName },
      },
    },
  });
  return { data: { message: "", error: false }, status: 200 };
};
export const unenrollCourseForTeacher = async (
  teacherEmail: string,
  courseName: string
) => {
  const enroll = await prisma.teacher.update({
    where: { email: teacherEmail },
    data: {
      courses: {
        disconnect: { name: courseName },
      },
    },
  });
  return enroll;
};
