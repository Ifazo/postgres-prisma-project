import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const postReview = async (req: Request, res: Response) => {
  const result = await prisma.review.create({
    data: req.body,
  });

  return res.send({
    success: true,
    statusCode: 200,
    message: "Review created successfully",
    data: result,
  });
};

const getReviews = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.review.findMany({
    where: {
      product: id,
    },
  });

  return res.send({
    success: true,
    statusCode: 200,
    message: "Review get successfully",
    data: result,
  });
};

const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.review.update({
    where: {
      id,
    },
    data: req.body,
  });

  return res.send({
    success: true,
    statusCode: 200,
    message: "Review updated successfully",
    data: result,
  });
};

const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.review.delete({
    where: {
      id,
    },
  });

  return res.send({
    success: true,
    statusCode: 200,
    message: "Review deleted successfully",
    data: result,
  });
};

export const reviewController = {
  postReview,
  getReviews,
  updateReview,
  deleteReview,
};
