import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

import studentRouter from "./routes/student-routes";
import courseRouter from "./course/course-router";
import enrollmentRouter from "./enrollment/enrollment-router";
import teacherRouter from "./routes/teacher-router";
import authRouter from "./auth/auth-router";

import swaggerDocument from "../swagger.json";

const server = express();
const port = process.env.PORT || 3333;

server.use(cors());
server.use(express.json());

server.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
server.use("/api/v1", authRouter);
server.use("/api/v1", studentRouter);
server.use("/api/v1", courseRouter);
server.use("/api/v1", enrollmentRouter);
server.use("/api/v1", teacherRouter);
server.use("*", (_, res) => {
  res.status(404).json({ message: "Route not found Go to /api/v1/docs" });
});

server.listen(port, () => {
  console.log(`App running on ${port}`);
});
