import { Router } from "express";

import {
  read,
  create,
  update,
  remove,
} from "./student.controller";

const studentRouter = Router();

studentRouter.get("/students", read);
studentRouter.post("/students", create);
studentRouter.put("/students/:id", update);
studentRouter.delete("/students/:id", remove);

export default studentRouter;
