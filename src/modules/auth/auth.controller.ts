import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../shared/sendResponse";
import { User } from "@prisma/client";
import config from "../../config";
import jwt, { Secret } from "jsonwebtoken";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.createUser(req.body);

  const tokenPayload = {
    userId: result?.id,
    role: result?.role,
  };

  const secret = config.jwt_secret_key as Secret;
  const token = jwt.sign(tokenPayload, secret, { expiresIn: "24h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.node_env === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  sendResponse<User>(res, {
    success: true,
    statusCode: 200,
    message: "User created successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  const tokenPayload = {
    userId: result?.id,
    role: result?.role,
  };

  const secret = config.jwt_secret_key as Secret;
  const token = jwt.sign(tokenPayload, secret, { expiresIn: "24h" });
  
  res.cookie("token", token, {
    httpOnly: true,
    secure: config.node_env === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  sendResponse<User>(res, {
    success: true,
    statusCode: 200,
    message: "User sign-in successfully",
    data: result,
  });
});

const profile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.headers?.userId as string;
  console.log(userId)
  const result = await authService.profile(userId);
  console.log(result)
  sendResponse<User>(res, {
    success: true,
    statusCode: 200,
    message: "User profile",
    data: result,
  });
});

export const authController = {
  createUser,
  loginUser,
  profile,
};
