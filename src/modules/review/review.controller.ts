import { Request, Response } from "express";
import { prisma } from "../../app";

const postReview = async (req: Request, res: Response) => {
  try {
    const result = await prisma.review.create({
      data: req.body,
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Review created successfully",
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

const getReviews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.review.findMany({
      where: {
        service: id,
      },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Review get successfully",
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

const updateReview = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const reviewController = {
  postReview,
  getReviews,
  updateReview,
  deleteReview,
};
