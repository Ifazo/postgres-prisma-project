import { Order, PrismaClient } from "@prisma/client";
import { Request } from "express";
import config from "../../config";
import jwt, { Secret } from "jsonwebtoken";

const prisma = new PrismaClient();

const postOrder = async (data: Order): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

const getOrder = async (req: Request) => {
  const token = req.headers.authorization as string;
  const secret = config.jwt_secret_key as Secret;
  const decodedToken = jwt.verify(token, secret) as Order;
  console.log(decodedToken);
  const { id } = decodedToken;
  const findUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  const result = await prisma.order.findMany({
    where: {
      userId: findUser?.id,
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
