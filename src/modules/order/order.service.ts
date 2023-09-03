import { Order, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const postOrder = async (data: Order): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

const getOrder = async () => {
  const result = await prisma.order.findMany();
  return {
    data: result,
  };
};

export const orderService = {
  postOrder,
  getOrder,
};
