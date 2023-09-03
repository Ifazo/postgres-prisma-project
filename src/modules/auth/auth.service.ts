import { Auth, PrismaClient, User } from "@prisma/client";
import { Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const loginUser = async (data: Auth): Promise<User> => {
  const { email } = data;

  const result = await prisma.user.findUnique({
    where: { email },
  });
  // Compare password with bcrypt
  // const isPasswordValid = bcrypt.compare(password, user?.password);
  // If password not valid
  // if (!isPasswordValid) {
  //   res.status(401).json({ success: false, message: "Invalid password" });

  // }
  // Set token into cookie
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "none",
  //   maxAge: 24 * 60 * 60 * 1000,
  // });
  return result!;
};

export const authService = {
  createUser,
  loginUser,
};
