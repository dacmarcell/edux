import { Request, Response } from "express";
import courseService from "./course-service";

export const read = async (_: Request, response: Response) => {
  try {
    const courses = await courseService.readCourses();
    return response.status(200).json({ message: courses, error: false });
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};

export const create = async (request: Request, response: Response) => {
  try {
    const { name } = request.body;
    const createCourse = await courseService.createCourses(name);
    return response.status(createCourse.status).json(createCourse.data);
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};

export const update = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name } = request.body;
    const updateCourse = await courseService.updateCourses(name, id);
    return response.status(updateCourse.status).json(updateCourse.data);
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};

export const remove = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const removeStudent = await courseService.removeCourses(id);
    return response.sendStatus(removeStudent.status);
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};

const courseController = {
  read,
  create,
  update,
  remove,
};

export default courseController;
