import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import config from "../../config";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { IAuth } from "../../interface";

const prisma = new PrismaClient();

const loginUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(400).send({
      success: false,
      message: "User not found!",
    });
  }
  const payload = {
    id: user.id,
    email: user.email,
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

  return res.status(200).send({
    success: true,
    message: "User sign-in successfully",
    token: token,
  });
};

const loginAdmin = async (req: Request, res: Response) => {
  const { email } = req.body;
  const admin = await prisma.admin.findUnique({
    where: { email },
  });
  if (!admin) {
    return res.status(400).send({
      success: false,
      message: "Admin not found!",
    });
  }
  const payload = {
    id: admin.id,
    email: admin.email,
    role: admin.role,
  };
  const secret = config.jwt_secret_key as Secret;
  const token = jwt.sign(payload, secret);
  req.headers.authorization = token;
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).send({
    success: true,
    message: "Admin sign-in successfully",
    token: token,
  });
};

const getProfile = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const secret = config.jwt_secret_key as Secret;
  const decodedToken = jwt.verify(token, secret) as JwtPayload;
  const { id } = decodedToken;
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return res.status(200).send({
    success: true,
    message: "User profile fetched successfully",
    data: user,
  });
};

const updateProfile = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const secret = config.jwt_secret_key as Secret;
  const decodedToken = jwt.verify(token, secret) as JwtPayload;
  const { id } = decodedToken;
  const user = await prisma.user.update({
    where: { id },
    data: req.body,
  });

  return res.status(200).send({
    success: true,
    message: "User profile updated successfully",
    data: user,
  });
};

export const authController = {
  loginUser,
  loginAdmin,
  getProfile,
  updateProfile,
};
