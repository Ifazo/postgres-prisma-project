import { Prisma, PrismaClient, User } from "@prisma/client";

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

const updateUserById = async (
  id: string,
  data: any
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: { id },
    data,
  });
  return result;
};

const deleteUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

export const userService = {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById
};
