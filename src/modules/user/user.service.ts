import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const postUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const getUser = async () => {
  const result = await prisma.user.findMany();
  return {
    data: result,
  };
};

export const userService = {
  postUser,
  getUser,
};
