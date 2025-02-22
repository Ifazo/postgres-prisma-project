import { Request, Response } from "express";
import { prisma } from "../../app";
import { redis } from "../..";
import productSchema from "../../schema/product.schema";
import sendResponse from "../../middlewares/sendResponse";

const productUpdateSchema = productSchema.partial();

const createProduct = async (req: Request, res: Response) => {
  try {
    const validationResult = productSchema.safeParse(req.body);
    if (!validationResult.success) {
      return sendResponse(res, 400, false, validationResult.error.errors);
    }
    const result = await prisma.product.create({
      data: validationResult.data,
    });
    await redis.del("products");
    return sendResponse(res, 201, true, "Product created successfully", result);
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, categoryId, skip, take } = req.query;
    const cacheKey = `products:${search}:${categoryId}:${skip}:${take}`;
    const cachedProducts = await redis.get(cacheKey);
    if (cachedProducts) {
      return sendResponse(
        res,
        200,
        true,
        "Products retrieved from redis cache successfully",
        JSON.parse(cachedProducts)
      );
    }
    let result;
    if (search) {
      result = await prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search as string,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search as string,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    } else if (categoryId) {
      result = await prisma.product.findMany({
        where: {
          categoryId: categoryId as string,
        },
      });
    } else if (skip && take) {
      result = await prisma.product.findMany({
        skip: Number(skip) || 0,
        take: Number(take) || 10,
      });
    } else {
      result = await prisma.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    return sendResponse(
      res,
      200,
      true,
      "Products retrieved successfully",
      result
    );
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cacheKey = `product:${id}`;
    const cachedProduct = await redis.get(cacheKey);

    if (cachedProduct) {
      return sendResponse(
        res,
        200,
        true,
        "Product retrieved from redis cache successfully",
        JSON.parse(cachedProduct)
      );
    }
    const result = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      return sendResponse(res, 404, false, "Product not found");
    }
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    return sendResponse(
      res,
      200,
      true,
      "Product retrieved successfully",
      result
    );
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validationResult = productUpdateSchema.safeParse(req.body);
    if (!validationResult.success) {
      return sendResponse(res, 400, false, validationResult.error.errors);
    }
    const result = await prisma.product.update({
      where: { id },
      data: validationResult.data,
    });
    if (!result) {
      return sendResponse(res, 404, false, "Product not found");
    }
    await redis.del(`product:${id}`);
    await redis.del("products");
    return sendResponse(res, 200, true, "Product updated successfully", result);
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.product.delete({
      where: {
        id,
      },
    });
    if (!result) {
      return sendResponse(res, 404, false, "Product not found");
    }
    await redis.del(`product:${id}`);
    await redis.del("products");
    return sendResponse(res, 200, true, "Product deleted successfully", result);
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

export const productController = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
