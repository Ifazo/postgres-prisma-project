import { Request, Response } from "express";
import { prisma } from "../../app";
import config from "../../config";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const postReview = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const token = req.headers.authorization as string;
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const { email, name, image } = decodedToken;
    data.user = email;
    data.name = name;
    data.image = image;
    const result = await prisma.review.create({
      data,
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
      message: error,
    });
  }
};

const getReviews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.review.findMany({
      where: {
        productId: id,
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
      message: error,
    });
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await prisma.review.update({
      where: {
        id,
      },
      data,
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
      message: error,
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
      message: error,
    });
  }
};

export const reviewController = {
  postReview,
  getReviews,
  updateReview,
  deleteReview,
};
