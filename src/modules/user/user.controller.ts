import { Request, Response } from "express";
import { prisma } from "../../app";
import { Role } from "@prisma/client";
import config from "../../config";
import { JwtPayload, Secret, verify } from "jsonwebtoken";

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
    const token = req.headers.authorization as string;
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = verify(token, secret) as JwtPayload;
    if (decodedToken.role === Role.user) {
      if (decodedToken.id !== id) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized",
        });
      }
    }
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "User get successfully",
      data: user,
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
    const token = req.headers.authorization as string;
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = verify(token, secret) as JwtPayload;
    if (decodedToken.role === Role.user) {
      if (decodedToken.id !== id) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized",
        });
      }
    }
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    
    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: user,
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
