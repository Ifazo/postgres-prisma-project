import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import config from "../../config";
import jwt, { Secret } from "jsonwebtoken";
import { IAuth, ILoginResponse, IUser } from "../../interface";

const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: req.body,
  });
  const payload: IAuth = {
    id: user.id,
    role: user.role,
  };
  const secret = config.jwt_secret_key as Secret;
  const token = jwt.sign(payload, secret);
  req.headers.authorization = token;
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.json({
    success: true,
    statusCode: 200,
    message: "User created successfully",
    data: user,
  });
};

const loginUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const payload: IAuth = {
    id: user.id,
    role: user.role,
  };
  const secret = config.jwt_secret_key as Secret;
  const token = jwt.sign(payload, secret);
  req.headers.authorization = token;
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.json(<ILoginResponse>{
    success: true,
    statusCode: 200,
    message: "User sign-in successfully",
    token: token,
  });
};

const profile = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const secret = config.jwt_secret_key as Secret;
  const decodedToken = jwt.verify(token, secret) as User;
  const { id } = decodedToken;
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return res.json({
    success: true,
    statusCode: 200,
    message: "User profile",
    data: user,
  });
};

export const authController = {
  createUser,
  loginUser,
  profile,
};
