import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const loginUser = async (data: User): Promise<User | null> => {
  const { email } = data;
  const result = await prisma.user.findUnique({
    where: { email },
  });
  return result;
};

const profile = async (userId: string): Promise<User | null> => {
  try {
    const result = await prisma.user.findUnique({
      where: { id: userId },
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while processing the profile");
  }
};

export { profile };

export const authService = {
  createUser,
  loginUser,
  profile,
};
