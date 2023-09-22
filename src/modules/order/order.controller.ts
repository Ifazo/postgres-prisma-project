import { Order, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import config from "../../config";
import jwt, { Secret } from "jsonwebtoken";

const prisma = new PrismaClient();

const postOrder = async (req: Request, res: Response) => {
  const data = req.body;
  const token = req.headers.authorization as string;
  const secret = config.jwt_secret_key as Secret;
  const decodedToken = jwt.verify(token, secret) as Order;
  const { id } = decodedToken;
  const result = await prisma.order.create({
    data: {
      ...data,
      userId: id,
    },
  });

  return res.json({
    success: true,
    statusCode: 200,
    message: "Order created successfully",
    data: result,
  });
};

const getOrder = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const secret = config.jwt_secret_key as Secret;
  const decodedToken = jwt.verify(token, secret) as Order;
  const { id } = decodedToken;
  const result = await prisma.order.findMany({
    where: {
      userId: id,
    },
  });

  return res.json({
    success: true,
    statusCode: 200,
    message: "Orders get successfully",
    data: result,
  });
};

const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  return res.json({
    success: true,
    statusCode: 200,
    message: "Order get successfully",
    data: result,
  });
};

export const orderController = {
  postOrder,
  getOrder,
  getOrderById,
};
