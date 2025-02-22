import { Request, Response } from "express";
import { prisma } from "../../app";
import { redis } from "../..";
import categorySchema from "../../schema/category.schema";
import sendResponse from "../../middlewares/sendResponse";

const categoryUpdateSchema = categorySchema.partial();

const postCategory = async (req: Request, res: Response) => {
  try {
    const validationResult = categorySchema.safeParse(req.body);
    if (!validationResult.success) {
      return sendResponse(res, 400, false, validationResult.error.errors);
    }

    const { name } = validationResult.data;
    const categoryExists = await prisma.category.findUnique({
      where: { name },
    });
    if (categoryExists) {
      return sendResponse(res, 409, false, "Category already exists");
    }
    const result = await prisma.category.create({
      data: validationResult.data,
    });
    await redis.del("categories");
    return sendResponse(
      res,
      201,
      true,
      "Category created successfully",
      result
    );
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const cacheKey = "categories";
    const cachedCategories = await redis.get(cacheKey);
    if (cachedCategories) {
      return sendResponse(res, 200, true, "Categories retrieved from redis cache successfully", JSON.parse(cachedCategories));
    }
    const result = await prisma.category.findMany();
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    return sendResponse(
      res,
      200,
      true,
      "Categories retrieved successfully",
      result
    );
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cacheKey = `category:${id}`;
    const cachedCategory = await redis.get(cacheKey);
    if (cachedCategory) {
      return sendResponse(
        res,
        200,
        true,
        "Category retrieved from redis cache successfully",
        JSON.parse(cachedCategory)
      );
    }
    const result = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      return sendResponse(res, 404, false, "Category not found");
    }
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    return sendResponse(
      res,
      200,
      true,
      "Category retrieved successfully",
      result
    );
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validationResult = categoryUpdateSchema.safeParse(req.body);
    if (!validationResult.success) {
      return sendResponse(res, 400, false, validationResult.error.errors);
    }
    const result = await prisma.category.update({
      where: { id },
      data: validationResult.data,
    });
    if (!result) {
      return sendResponse(res, 404, false, "Category not found");
    }
    await redis.del(`category:${id}`);
    await redis.del("categories");
    return sendResponse(
      res,
      200,
      true,
      "Category updated successfully",
      result
    );
  } catch (error) {
    return sendResponse(res, 500, false, error);
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
      return sendResponse(res, 404, false, "Category not found");
    }
    await redis.del(`category:${id}`);
    await redis.del("categories");
    return sendResponse(
      res,
      200,
      true,
      "Category deleted successfully",
      result
    );
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

export const categoryController = {
  postCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
