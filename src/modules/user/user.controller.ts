import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (_req: Request, res: Response) => {
  const result = await prisma.user.findMany();

  return res.json({
    success: true,
    statusCode: 200,
    message: "Users get successfully",
    data: result,
  });
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return res.json({
    success: true,
    statusCode: 200,
    message: "User get successfully",
    data: result,
  });
};

const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await prisma.user.update({
    where: { id },
    data,
  });

  return res.json({
    success: true,
    statusCode: 200,
    message: "User updated successfully",
    data: result,
  });
};

const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  return res.json({
    success: true,
    statusCode: 200,
    message: "User deleted successfully",
    data: result,
  });
};

export const userController = {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
