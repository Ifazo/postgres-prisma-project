import { Request, Response } from "express";
import { prisma } from "../../app";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { redis } from "../..";

const createReview = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await prisma.review.create({
      data,
    });
    await redis.del("reviews");
    return res.send({
      success: true,
      statusCode: 200,
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

const getReviews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cacheKey = `reviews:${id}`;
    const cachedReviews = await redis.get(cacheKey);

    if (cachedReviews) {
      return res.status(200).send({
        success: true,
        message: "Reviews retrieved from cache successfully",
        data: JSON.parse(cachedReviews),
      });
    }
    const result = await prisma.review.findMany({
      where: {
        productId: id,
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
      message: "Review get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
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
    const { id: user } = decodedToken;
    const review = await prisma.review.findUnique({
      where: {
        id,
      },
    });
    if (review?.userId !== user) {
      return res.status(403).send({
        success: false,
        message: "You are not owner to update this review",
      });
    }
    const result = await prisma.review.update({
      where: {
        id,
      },
      data,
    });
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Review not found",
      });
    }
    await redis.del(`reviews:${id}`);
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
    const { id: user } = decodedToken;
    const review = await prisma.review.findUnique({
      where: {
        id,
      },
    });
    if (review?.userId !== user) {
      return res.status(403).send({
        success: false,
        message: "You are not owner to update this review",
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
  createReview,
  getReviews,
  updateReview,
  deleteReview,
};
