import { Request, Response } from "express";
import { prisma } from "../../app";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { redis } from "../..";
import dotenv from "dotenv";
import reviewSchema from "../../schema/review.schema";
import sendResponse from "../../middlewares/sendResponse";
import verifyToken from "../../middlewares/verifyToken";

dotenv.config();

const reviewUpdateSchema = reviewSchema.partial();

const getReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.query;
    if (!productId) {
      return sendResponse(res, 400, false, "Product ID not provided");
    }
    const cacheKey = `reviews:${productId}`;
    const cachedReviews = await redis.get(cacheKey);
    if (cachedReviews) {
      return sendResponse(
        res,
        200,
        true,
        "Reviews retrieved from redis cache successfully",
        JSON.parse(cachedReviews)
      );
    }
    const result = await prisma.review.findMany({
      where: {
        productId: productId as string,
      },
    });
    if (!result) {
      return sendResponse(res, 404, false, "Reviews not found");
    }
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    return sendResponse(
      res,
      200,
      true,
      "Reviews retrieved successfully",
      result
    );
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const createReview = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse(res, 401, false, "Authorization header not provided.");
    }
    const decodedToken = verifyToken(authHeader);
    if (!decodedToken) {
      return sendResponse(res, 401, false, "Invalid token.");
    }
    const userId = decodedToken.id;
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      return sendResponse(res, 404, false, "User not found.");
    }
    const validationResult = reviewSchema.safeParse(req.body);
    if (!validationResult.success) {
      return sendResponse(res, 400, false, validationResult.error.errors);
    }
    const result = await prisma.review.create({
      data: {
        ...validationResult.data,
        userId,
      },
    });
    await redis.del(`reviews:${result.productId}`);
    return sendResponse(res, 201, true, "Review created successfully", result);
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const getReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cacheKey = `reviews:${id}`;
    const cachedReview = await redis.get(cacheKey);
    if (cachedReview) {
      return sendResponse(
        res,
        200,
        true,
        "Review retrieved from redis cache successfully",
        JSON.parse(cachedReview)
      );
    }
    const result = await prisma.review.findUnique({
      where: {
        id,
      },
    });
    if (!result) {
      return sendResponse(res, 404, false, "Review not found");
    }
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    return sendResponse(
      res,
      200,
      true,
      "Review retrieved successfully",
      result
    );
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validationResult = reviewUpdateSchema.safeParse(req.body);
    if (!validationResult.success) {
      return sendResponse(res, 400, false, validationResult.error.errors);
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse(res, 401, false, "Authorization header not provided.");
    }
    const decodedToken = verifyToken(authHeader);
    if (!decodedToken) {
      return sendResponse(res, 401, false, "Invalid token.");
    }
    const userId = decodedToken.id;
    const review = await prisma.review.findUnique({
      where: {
        id,
      },
    });
    if (review?.userId !== userId) {
      return sendResponse(res, 403, false, "Unauthorized user");
    }
    const result = await prisma.review.update({
      where: {
        id,
      },
      data: validationResult.data,
    });
    if (!result) {
      return sendResponse(res, 404, false, "Review not found");
    }
    await redis.del(`reviews:${id}`);
    await redis.del(`reviews:${result.productId}`);
    return sendResponse(res, 200, true, "Review updated successfully", result);
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse(
        res,
        401,
        false,
        "Unauthorized: No Bearer token provided."
      );
    }
    const decodedToken = verifyToken(authHeader);
    if (!decodedToken) {
      return sendResponse(res, 401, false, "Invalid token.");
    }
    const userId = decodedToken.id;
    const review = await prisma.review.findUnique({
      where: {
        id,
      },
    });
    if (review?.userId !== userId) {
      return sendResponse(res, 403, false, "Unauthorized user");
    }
    const result = await prisma.review.delete({
      where: {
        id,
      },
    });
    if (!result) {
      return sendResponse(res, 404, false, "Review not found");
    }
    await redis.del(`reviews:${id}`);
    await redis.del(`reviews:${result.productId}`);
    return sendResponse(res, 200, true, "Review deleted successfully", result);
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

export const reviewController = {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
};
