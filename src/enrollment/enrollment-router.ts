import { Router } from "express";
import {
  enrollStudentByEmail,
  enrollStudentByID,
  teacherCoursUnenrollment,
  teacherCourseEnrollment,
  unenrollStudentByEmail,
  unenrollStudentByID,
} from "./enrollment-controller";

const enrollmentRouter = Router();

enrollmentRouter.post("/enroll/:studentID", enrollStudentByID);
enrollmentRouter.post("/enroll", enrollStudentByEmail);
enrollmentRouter.post("/unenroll/:studentID", unenrollStudentByID);
enrollmentRouter.post("/unenroll", unenrollStudentByEmail);
enrollmentRouter.post("/teacher-enroll", teacherCourseEnrollment);
enrollmentRouter.post("/teacher-unenroll", teacherCoursUnenrollment);

export default enrollmentRouter;
