import { Request, Response } from "express";
import { prisma } from "../../app";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { redis } from "../..";
import dotenv from "dotenv";
import reviewSchema from "../../schema/review.schema";

dotenv.config();

const reviewUpdateSchema = reviewSchema.partial();

const getReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.query;
    if (!productId) {
      return res.status(400).send({
        success: false,
        message: "Product id is required",
      });
    }
    const cacheKey = `reviews:${productId}`;
    const cachedReviews = await redis.get(cacheKey);
    if (cachedReviews) {
      return res.status(200).send({
        success: true,
        message: "Product Reviews retrieved from redis cache successfully",
        data: JSON.parse(cachedReviews),
      });
    }
    const result = await prisma.review.findMany({
      where: {
        productId: productId as string,
      },
    });
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Product of review not found",
      });
    }
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Product Reviews get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const createReview = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No Bearer token provided.",
      });
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET_KEY as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const userId = decodedToken.id;
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const validationResult = reviewSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).send({
        success: false,
        message: validationResult.error.errors,
      });
    }
    const result = await prisma.review.create({
      data: {
        ...validationResult.data,
        userId,
      },
    });
    await redis.del(`reviews:${result.productId}`);
    return res.status(201).send({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cacheKey = `reviews:${id}`;
    const cachedReview = await redis.get(cacheKey);
    if (cachedReview) {
      return res.status(200).send({
        success: true,
        message: "Review retrieved from redis cache successfully",
        data: JSON.parse(cachedReview),
      });
    }
    const result = await prisma.review.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Review not found",
      });
    }
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Review get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
}

const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validationResult = reviewUpdateSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).send({
        success: false,
        message: validationResult.error.errors,
      });
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No Bearer token provided.",
      });
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET_KEY as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const userId = decodedToken.id;
    const review = await prisma.review.findUnique({
      where: {
        id,
      },
    });
    if (review?.userId !== userId) {
      return res.status(403).send({
        success: false,
        message: "You are not the owner of this review",
      });
    }

    const result = await prisma.review.update({
      where: {
        id,
      },
      data: validationResult.data,
    });
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Review not found",
      });
    }
    await redis.del(`reviews:${id}`);
    await redis.del(`reviews:${result.productId}`);
    return res.send({
      success: true,
      statusCode: 200,
      message: "Review updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No Bearer token provided.",
      });
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET_KEY as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const userId = decodedToken.id;

    const review = await prisma.review.findUnique({
      where: {
        id,
      },
    });
    if (review?.userId !== userId) {
      return res.status(403).send({
        success: false,
        message: "You are not the owner of this review",
      });
    }

    const result = await prisma.review.delete({
      where: {
        id,
      },
    });
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Review not found",
      });
    }
    await redis.del(`reviews:${id}`);
    await redis.del(`reviews:${result.productId}`);
    return res.send({
      success: true,
      statusCode: 200,
      message: "Review deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

export const reviewController = {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
};