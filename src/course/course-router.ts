import { Router } from "express";
import courseController from "./course-controller";

const courseRouter = Router();

courseRouter.get("/courses", courseController.read);
courseRouter.post("/courses", courseController.create);
courseRouter.put("/courses/:id", courseController.update);
courseRouter.delete("/courses/:id", courseController.remove);

export default courseRouter;
