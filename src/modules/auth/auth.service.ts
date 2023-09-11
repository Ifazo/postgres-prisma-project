import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const loginUser = async (data: User): Promise<User> => {
  const { email } = data;
  const result = await prisma.user.findUnique({
    where: { email },
  });
  return result!;
};

export const authService = {
  createUser,
  loginUser,
};
