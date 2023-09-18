import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../shared/sendResponse";
import { User } from "@prisma/client";
import config from "../../config";
import jwt, { Secret } from "jsonwebtoken";
import { ILoginResponse, IUser } from "../../interface";

const setCookie = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: config.node_env === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.createUser(req.body);

  sendResponse<User>(res, {
    success: true,
    statusCode: 200,
    message: "User created successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  const secret = config.jwt_secret_key as Secret;
  const token = jwt.sign(result, secret);
  setCookie(res, token);

  return res.json(<ILoginResponse>{
    success: true,
    statusCode: 200,
    message: "User sign-in successfully",
    token: token,
  });
});

const profile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const secret = config.jwt_secret_key as Secret;
  const decodedToken = jwt.verify(token, secret) as User;
  const {id} = decodedToken;
  const result = await authService.profile(id as string);
  
  return res.json(<IUser>{
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
