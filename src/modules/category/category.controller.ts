import { Request, Response } from "express";
import { prisma } from "../../app";
import { redis } from "../..";

const postCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const categoryExists = await prisma.category.findUnique({
      where: { name },
    });
    if (categoryExists) {
      return res.status(400).send({
        success: false,
        message: "Category already exists",
      });
    }
    const result = await prisma.category.create({
      data: req.body,
    });
    await redis.del("categories");
    return res.status(200).send({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const cacheKey = "categories";
    const cachedCategories = await redis.get(cacheKey);

    if (cachedCategories) {
      return res.status(200).send({
        success: true,
        message: "Categories retrieved from redis cache successfully",
        data: JSON.parse(cachedCategories),
      });
    }

    const result = await prisma.category.findMany();
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    return res.status(200).send({
      success: true,
      message: "Categories get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cacheKey = `category:${id}:products`;
    const cachedProducts = await redis.get(cacheKey);

    if (cachedProducts) {
      return res.status(200).send({
        success: true,
        message: "Category products retrieved from redis cache successfully",
        data: JSON.parse(cachedProducts),
      });
    }
    const result = await prisma.product.findMany({
      where: {
        categoryId: id,
      },
    });
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    return res.status(200).send({
      success: true,
      message: "Category products get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
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
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    await redis.del(`category:${id}`);
    await redis.del("categories");
    return res.send({
      success: true,
      statusCode: 200,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
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
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    await redis.del(`category:${id}`);
    await redis.del("categories");
    return res.send({
      success: true,
      statusCode: 200,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

export const categoryController = {
  postCategory,
  getCategories,
  getProductsByCategory,
  updateCategoryById,
  deleteCategoryById,
};
