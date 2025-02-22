import { Request, Response } from "express";
import { prisma } from "../../app";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany();
    return res.status(200).send({
      success: true,
      message: "Orders get successfully",
      data: orders,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
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
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }
    if (order?.userId !== userId) {
      return res.status(403).send({
        success: false,
        message: "You are not the owner of this order",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Order get successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

export const orderController = {
  getOrders,
  getOrderById,
};
