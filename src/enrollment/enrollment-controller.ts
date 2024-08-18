import { Request, Response } from "express";
import {
  enrollCourseForTeacher,
  enrollmentByEmail,
  enrollmentByID,
  unenrollCourseForTeacher,
  unenrollmentByEmail,
  unenrollmentByID,
} from "./enrollment-service";

export const enrollStudentByID = async (
  request: Request,
  response: Response
) => {
  try {
    const { studentID } = request.params;
    const { courseID } = request.body;
    const enroll = await enrollmentByID(studentID, courseID);
    return response.status(200).json({ message: enroll, error: false });
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};

export const enrollStudentByEmail = async (
  request: Request,
  response: Response
) => {
  try {
    const { studentEmail, courseName } = request.body;
    const enroll = await enrollmentByEmail(studentEmail, courseName);
    return response.status(200).json({ message: enroll, error: false });
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};

export const unenrollStudentByID = async (
  request: Request,
  response: Response
) => {
  try {
    const { studentID } = request.params;
    const { courseID } = request.body;
    const enroll = await unenrollmentByID(studentID, courseID);
    return response.status(200).json({ message: enroll, error: false });
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};

export const unenrollStudentByEmail = async (
  request: Request,
  response: Response
) => {
  try {
    const { studentEmail, courseName } = request.body;
    const unenroll = await unenrollmentByEmail(studentEmail, courseName);
    return response.status(200).json({ message: unenroll, error: false });
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};

//////////////////////// Teacher EnrollMents /////////////////////////////

export const teacherCourseEnrollment = async (
  request: Request,
  response: Response
) => {
  try {
    const { teacherEmail, courseName } = request.body;
    const enroll = await enrollCourseForTeacher(teacherEmail, courseName);
    return response.status(enroll.status).json(enroll.data);
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};
export const teacherCoursUnenrollment = async (
  request: Request,
  response: Response
) => {
  try {
    const { teacherEmail, courseName } = request.body;
    const unenroll = await unenrollCourseForTeacher(teacherEmail, courseName);
    return response.status(200).json({ message: unenroll, error: false });
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};
