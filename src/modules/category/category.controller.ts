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
    message: "Categories get successfully",
    data: result,
  });
});

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryService.getCategoryById(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Category get successfully",
    data: result,
  });
});

const updateCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await categoryService.updateCategoryById(id, data);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await categoryService.deleteCategoryById(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Category deleted successfully",
    data: result,
  });
});

export const categoryController = {
  postCategory,
  getCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
