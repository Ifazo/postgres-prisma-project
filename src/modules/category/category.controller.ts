import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const postCategory = async (req: Request, res: Response) => {
  const result = await prisma.category.create({
    data: req.body,
  });

  return res.json({
    success: true,
    statusCode: 200,
    message: "Category created successfully",
    data: result,
  });
};

const getCategory = async (_req: Request, res: Response) => {
  const result = await prisma.category.findMany();

  return res.json({
    success: true,
    statusCode: 200,
    message: "Categories get successfully",
    data: result,
  });
};

const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return res.json({
    success: true,
    statusCode: 200,
    message: "Category get successfully",
    data: result,
  });
};

const updateCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await prisma.category.update({
    where: { id },
    data: req.body,
  });

  return res.json({
    success: true,
    statusCode: 200,
    message: "Category updated successfully",
    data: result,
  });
};

const deleteCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return res.json({
    success: true,
    statusCode: 200,
    message: "Category deleted successfully",
    data: result,
  });
};

export const categoryController = {
  postCategory,
  getCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
