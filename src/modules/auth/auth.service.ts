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

const loginUser = async (data: User): Promise<User> => {
  const { email } = data;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const profile = async (id: string): Promise<User | null> => {
  try {
    const result = await prisma.user.findUnique({
      where: { id },
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
