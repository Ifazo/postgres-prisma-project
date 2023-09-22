import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const postReview = async (req: Request, res: Response) => {
  const result = await prisma.reviewAndRating.create({
    data: req.body,
  });

  return res.send({
    success: true,
    statusCode: 200,
    message: "Review created successfully",
    data: result,
  });
};

const getReview = async (_req: Request, res: Response) => {
  const result = await prisma.reviewAndRating.findMany();

  return res.send({
    success: true,
    statusCode: 200,
    message: "Review get successfully",
    data: result,
  });
};

export const reviewController = {
  postReview,
  getReview,
};
