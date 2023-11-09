import { Request, Response } from "express";
import { prisma } from "../../app";

const createUser = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const getUsers = async (_req: Request, res: Response) => {
  try {
    const result = await prisma.user.findMany();
    return res.send({
      success: true,
      statusCode: 200,
      message: "Users get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const userController = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
