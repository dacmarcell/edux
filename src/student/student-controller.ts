import { Request, Response } from "express";
import studentService from "../services/student-service";

export const read = async (request: Request, response: Response) => {
  try {
    const students = await studentService.readStudents();
    return response.status(200).json({ message: students, error: false });
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};

export const create = async (request: Request, response: Response) => {
  try {
    const createStudent = await studentService.createStudent(request.body);
    return response.status(createStudent.status).json(createStudent.data);
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};

export const update = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    if (!id) {
      return response
        .status(400)
        .json({ message: "ID is Required", error: true });
    }

    const updateStudent = await studentService.updateStudent(request.body, id);
    return response.status(updateStudent.status).json(updateStudent.data);
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};

export const remove = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const removeStudent = await studentService.deleteStudent(id);
    return response.sendStatus(removeStudent.status);
  } catch (error) {
    return response.status(500).json({ message: error, error: true });
  }
};

const studentController = {
  read,
  create,
  update,
  remove,
};

export default studentController;
