import { PrismaClient, User } from "@prisma/client";
import { Response } from "express";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../config";

const prisma = new PrismaClient();

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const loginUser = async (data: User, res: Response): Promise<User> => {
  const { email } = data;
  const result = await prisma.user.findUnique({
    where: { email },
  });

  const tokenPayload = {
    role: result?.role,
    id: result?.id,
  };

  const secret = config.jwt_secret_key as Secret;
  const token = jwtHelpers.createToken(tokenPayload, secret);
  
  res.cookie("token", token, {
    httpOnly: true,
    secure: config.node_env === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return result!;
};

export const authService = {
  createUser,
  loginUser,
};
