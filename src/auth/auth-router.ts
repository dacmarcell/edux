import { Router } from "express";
import { getUserProfile, loginUser } from "./auth-controller";

const authRouter = Router();

authRouter.get("/profile", getUserProfile);
authRouter.post("/login", loginUser);

export default authRouter;
