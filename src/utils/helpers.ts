import { Teacher } from "./types";
import { teacherValidationSchema } from "./validation";
import prisma from "../../prisma/prisma-client";

//Teacher

export const validateTeacher = (teacher: Teacher) => {
  const validation = teacherValidationSchema.safeParse(teacher);
  return validation;
};

//Student
