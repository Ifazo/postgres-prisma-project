import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";

const getUsers = catchAsync(async (_req: Request, res: Response) => {
  const result = await userService.getUsers();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Users get successfully",
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.getUserById(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User get successfully",
    data: result,
  });
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await userService.updateUserById(id, data);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User updated successfully",
    data: result,
  });
});

const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.deleteUserById(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User deleted successfully",
    data: result,
  });
});

export const userController = {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
