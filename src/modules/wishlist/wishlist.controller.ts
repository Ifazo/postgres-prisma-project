import { Request, Response } from "express";
import { prisma } from "../../app";

const createWishlist = async (req: Request, res: Response) => {
  try {
    const data = req.body;
  const result = await prisma.wishlist.create({
    data,
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

const getWishlist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.wishlist.findMany({
      where: {
        user: id,
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
  getWishlist,
  deleteWishlist,
};
