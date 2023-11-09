import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  const userExists = await prisma.user.findUnique({
    where: { email },
  });
  if (userExists) {
    return res.status(400).send({
      success: false,
      message: "User already exists",
    });
  }
  const user = await prisma.user.create({
    data: req.body,
  });

  return res.status(200).send({
    success: true,
    message: "User created successfully",
    data: user,
  });
};

const getUsers = async (_req: Request, res: Response) => {
  const result = await prisma.user.findMany();

  return res.send({
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

  return res.send({
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

  return res.send({
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

  return res.send({
    success: true,
    statusCode: 200,
    message: "User deleted successfully",
    data: result,
  });
};

export const userController = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
