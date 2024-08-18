import jwt from "jsonwebtoken";

import prisma from "../../prisma/prisma-client";
import { JwtData } from "../utils/types";

export const login = async (email: string, password: string) => {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return {
      data: { message: "User Not Found", error: true },
      status: 404,
    };
  }

  const token = jwt.sign({ email: email }, process.env.JWT_SECRET ?? "", {
    expiresIn: "30s",
  });

  return { data: { token, error: false }, status: 202 };
};

export const getJwtToken = (authorization: string) => {
  const token = authorization.split(" ")[1];
  return token;
};

export const verifyJwt = (token: string) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtData;
    return data.email;
  } catch (err) {
    return false;
  }
};

export const getUserEmail = (token: string) => {
  const id = verifyJwt(token);
  return id;
};

export default login;
