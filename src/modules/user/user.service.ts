import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async () => {
  const result = await prisma.user.findMany();
  return {
    data: result,
  };
};

const getUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const userService = {
  getUsers,
  getUserById,
};
