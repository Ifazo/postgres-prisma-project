import { Request, Response } from "express";
import { prisma } from "../../app";

const postCategory = async (req: Request, res: Response) => {
  try {
    const result = await prisma.category.create({
      data: req.body,
    });
    return res.status(200).send({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const getCategory = async (_req: Request, res: Response) => {
  try {
    const result = await prisma.category.findMany();
    return res.status(200).send({
      success: true,
      message: "Categories get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    return res.status(200).send({
      success: true,
      message: "Category get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.category.update({
      where: { id },
      data: req.body,
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.category.delete({
      where: {
        id,
      },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const categoryController = {
  postCategory,
  getCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
