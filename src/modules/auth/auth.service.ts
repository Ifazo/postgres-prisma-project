import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const loginUser = async (data: User): Promise<User> => {
  const { email } = data;
  const result = await prisma.user.findUnique({
    where: { email },
  });
  return result!;
};

const profile = async (req: Request): Promise<User> => {
  const id = req.body.userId;
  const result = await prisma.user.findUnique({
    where: { id },
  });
  return result!;
};

export const authService = {
  createUser,
  loginUser,
  profile,
};
