import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const getUser = async () => {
  const result = await prisma.user.findMany();
  return {
    data: result,
  };
};

export const userService = {
  getUser,
};
