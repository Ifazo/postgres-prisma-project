import { PrismaClient, User } from "@prisma/client";
import { Response } from "express";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const prisma = new PrismaClient();

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const loginUser = async (data: User, res: Response): Promise<string> => {
  const { email } = data;
  const result = await prisma.user.findUnique({
    where: { email },
  });

  const tokenPayload = {
    role: result?.role,
    id: result?.id,
    iat: Math.floor(Date.now() / 1000) - 3600 * 24 * 365,
  };

  const token = jwtHelpers.createToken(tokenPayload);
  return token;
};

export const authService = {
  createUser,
  loginUser,
};
