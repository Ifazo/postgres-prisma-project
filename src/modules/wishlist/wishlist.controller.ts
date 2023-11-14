import { Request, Response } from "express";
import { prisma } from "../../app";
import config from "../../config";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const createWishlist = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const token = req.headers.authorization as string;
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const { email } = decodedToken;
    const result = await prisma.wishlist.create({
      data: { user: email, service: data },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Wishlist created successfully",
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

const userWishlist = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const { email } = decodedToken;
    const result = await prisma.wishlist.findMany({
      where: {
        user: email,
      },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Wishlist get successfully",
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

const getWishlist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.wishlist.findUnique({
      where: {
        id,
      },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Wishlist get successfully",
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

const deleteWishlist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.wishlist.delete({
      where: {
        id,
      },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Wishlist deleted successfully",
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

export const wishlistController = {
  createWishlist,
  userWishlist,
  getWishlist,
  deleteWishlist,
};
