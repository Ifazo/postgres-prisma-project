import { Request, Response } from "express";
import { prisma } from "../../app";
import { Role } from "@prisma/client";

const getUsers = async (_req: Request, res: Response) => {
  try {
    const result = await prisma.user.findMany({
      where: { role: Role.user },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Users get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getAdmins = async (_req: Request, res: Response) => {
  try {
    const result = await prisma.user.findMany({
      where: { role: Role.admin },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Admin get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.user.findUnique({
      where: { id },
    });
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    return res.send({
      success: true,
      statusCode: 200,
      message: "User get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
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
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
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
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

export const userController = {
  getUsers,
  getAdmins,
  getUserById,
  updateUserById,
  deleteUserById,
};
