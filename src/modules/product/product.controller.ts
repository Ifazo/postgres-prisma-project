import { Request, Response } from "express";
import { prisma } from "../../app";
import { redis } from "../..";

const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await prisma.product.create({
      data: req.body,
    });
    await redis.del("products");
    return res.status(200).send({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, categoryId, skip, take } = req.query;
    const cacheKey = `products:${search}:${categoryId}:${skip}:${take}`;
    const cachedProducts = await redis.get(cacheKey);
    if (cachedProducts) {
      return res.status(200).send({
        success: true,
        message: "Products retrieved from redis cache successfully",
        data: JSON.parse(cachedProducts),
      });
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
    }
    else if (categoryId) {
      result = await prisma.product.findMany({
        where: {
          categoryId: categoryId as string,
        },
      });
    }
    else if (skip && take) {
      result = await prisma.product.findMany({
        skip: Number(skip) || 0,
        take: Number(take) || 10,
      });
    }
    else {
      result = await prisma.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    return res.status(200).send({
      success: true,
      message: "Products retrieved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cacheKey = `product:${id}`;
    const cachedProduct = await redis.get(cacheKey);

    if (cachedProduct) {
      return res.status(200).send({
        success: true,
        message: "Product retrieved from redis cache successfully",
        data: JSON.parse(cachedProduct),
      });
    }
    const result = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    return res.status(200).send({
      success: true,
      message: "Product get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await prisma.product.update({
      where: { id },
      data,
    });
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    await redis.del(`product:${id}`);
    await redis.del("products");
    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
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
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    await redis.del(`product:${id}`);
    await redis.del("products");
    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

export const productController = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
