import { Request, Response } from "express";
import {
  getJwtToken,
  getUserEmail,
  login,
  verifyJwt,
} from "./auth.service";
import Joi from "joi";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: `Erro de validação: ${error.details
        .map((detail) => detail.message)
        .join(",")}`,
      error: true,
    });
  }

  const loggedUserData = await login(email, password);
  return res.status(loggedUserData.status).json(loggedUserData.data);
};

export async function getUserProfile(req: Request, res: Response) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized", error: false });
    }

    const token = getJwtToken(authorization);

    const isValid = verifyJwt(token);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid Token", error: true });
    }

    const email = getUserEmail(token);

    return res.json({ message: email, error: false });
  } catch (e) {
    return res.status(500).json({ message: e, error: true });
  }
}

//JWT

const authController = {
  loginUser,
  getUserProfile,
};

export default authController;
