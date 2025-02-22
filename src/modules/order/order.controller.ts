import { Request, Response } from "express";
import { prisma } from "../../app";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import sendResponse from "../../middlewares/sendResponse";
import verifyToken from "../../middlewares/verifyToken";

const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany();
    return sendResponse(
      res,
      200,
      true,
      "Orders retrieved successfully",
      orders
    );
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse(res, 401, false, "Unauthorized");
    }
    const decodedToken = verifyToken(authHeader);
    if (!decodedToken) {
      return sendResponse(res, 401, false, "Unauthorized");
    }
    const userId = decodedToken.id;
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });
    if (!order) {
      return sendResponse(res, 404, false, "Order not found");
    }
    if (order?.userId !== userId) {
      return sendResponse(res, 403, false, "Forbidden");
    }
    return sendResponse(res, 200, true, "Order retrieved successfully", order);
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

export const orderController = {
  getOrders,
  getOrderById,
};
