import { Order, OrderedBook, PrismaClient } from "@prisma/client";

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
  getOrderById
};
