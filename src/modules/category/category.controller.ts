import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { categoryService } from "./category.service";
import sendResponse from "../../shared/sendResponse";
import { Category } from "@prisma/client";

const postCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.postCategory(req.body);
  sendResponse<Category>(res, {
    success: true,
    statusCode: 200,
    message: "Category created successfully",
    data: result,
  });
});

const getCategory = catchAsync(async (_req: Request, res: Response) => {
  const result = await categoryService.getCategory();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Category get successfully",
    data: result,
  });
});

export const categoryController = {
  postCategory,
  getCategory,
};
