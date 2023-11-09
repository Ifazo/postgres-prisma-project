import { Order, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import config from "../../config";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const prisma = new PrismaClient();

const postOrder = async (req: Request, res: Response) => {
  const data = req.body;
  const token = req.headers.authorization as string;
  const secret = config.jwt_secret_key as Secret;
  const decodedToken = jwt.verify(token, secret) as JwtPayload;
  const { id } = decodedToken;
  const result = await prisma.order.create({
    data: {
      ...data,
      user: id,
    },
  });

  return res.send({
    success: true,
    statusCode: 200,
    message: "Order created successfully",
    data: result,
  });
};

const getOrders = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  if (!token) {
    return res.send({
      success: false,
      statusCode: 401,
      message: "Unauthorized",
    });
  }
  const secret = config.jwt_secret_key as Secret;
  const decodedToken = jwt.verify(token, secret) as JwtPayload;
  const { id, role } = decodedToken;
  if (role === "admin") {
    const result = await prisma.order.findMany();
    return res.send({
      success: true,
      statusCode: 200,
      message: "Orders get successfully",
      data: result,
    });
  }
  const result = await prisma.order.findMany({
    where: {
      user: id,
    },
  });

  return res.send({
    success: true,
    statusCode: 200,
    message: "Orders get successfully",
    data: result,
  });
}

const getOrderById = async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const token = req.headers.authorization as string;
  if (!token) {
    return res.send({
      success: false,
      statusCode: 401,
      message: "Unauthorized",
    });
  }
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
  const { user } = order as Order;
  const secret = config.jwt_secret_key as Secret;
  const decodedToken = jwt.verify(token, secret) as JwtPayload;
  const { id, role } = decodedToken;
  if (role === "admin") {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Order get successfully",
      data: result,
    });
  }
  else if (user === id) {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Order get successfully",
      data: result,
    });
  }

  return res.send({
    success: true,
    statusCode: 200,
    message: "Invalid order Id",
  });
};

const deleteOrderById = async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const token = req.headers.authorization as string;
  if (!token) {
    return res.send({
      success: false,
      statusCode: 401,
      message: "Unauthorized",
    });
  }
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
  const { user } = order as Order;
  const secret = config.jwt_secret_key as Secret;
  const decodedToken = jwt.verify(token, secret) as JwtPayload;
  const { id, role } = decodedToken;
  if (role === "admin") {
    const result = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Order deleted successfully",
      data: result,
    });
  }
  else if (user === id) {
    const result = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Order deleted successfully",
      data: result,
    });
  }

  return res.send({
    success: true,
    statusCode: 200,
    message: "Invalid order Id",
  });
}

export const orderController = {
  postOrder,
  getOrders,
  getOrderById,
  deleteOrderById,
};
