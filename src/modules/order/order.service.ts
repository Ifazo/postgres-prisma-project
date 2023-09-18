import { Order, PrismaClient } from "@prisma/client";
import { Request } from "express";
import config from "../../config";
import jwt, { Secret } from "jsonwebtoken";
import { IOrderedBook } from "../../interface";

const prisma = new PrismaClient();

const postOrder = async (data: Order[], req: Request): Promise<Order> => {
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
  return result;
};

const getOrder = async (req: Request) => {
  const token = req.headers.authorization as string;
  const secret = config.jwt_secret_key as Secret;
  const decodedToken = jwt.verify(token, secret) as Order;
  const { id } = decodedToken;

  const result = await prisma.order.findMany({
    where: {
      userId: id,
    },
  });
  return {
    data: result,
  };
};

const getOrderById = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const orderService = {
  postOrder,
  getOrder,
  getOrderById,
};
