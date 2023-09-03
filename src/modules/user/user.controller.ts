import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import { User } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";

const getUser = catchAsync(async (_req: Request, res: Response) => {
  const result = await userService.getUser();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User get successfully",
    data: result,
  });
});

export const userController = {
  getUser,
};
