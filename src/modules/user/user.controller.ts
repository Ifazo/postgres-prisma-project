import { Request, Response } from "express";
import { prisma } from "../../app";
import { UserRole } from "@prisma/client";
import { JwtPayload, Secret, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import userSchema from "../../schema/user.schema";

dotenv.config();

const userUpdateSchema = userSchema.partial();

const getUsers = async (req: Request, res: Response) => {
  try {
    const { role } = req.query;
    if (!role) {
      return res.status(400).send({
        success: false,
        message: "Role is required",
      });
    }
    const result = await prisma.user.findMany({
      where: {
        role: role as UserRole,
      },
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

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No Bearer token provided.",
      });
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET_KEY as Secret;
    const decodedToken = verify(token, secret) as JwtPayload;
    if (decodedToken.id !== id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: You are not allowed to access this resource.",
      });
    }
    const result = await prisma.user.findUnique({
      where: { id },
    });
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
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
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No Bearer token provided.",
      });
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET_KEY as Secret;
    const decodedToken = verify(token, secret) as JwtPayload;
    if (decodedToken.id !== id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: You are not allowed to access this resource.",
      });
    }
    const validationResult = userUpdateSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).send({
        success: false,
        message: validationResult.error.errors,
      });
    }
    const result = await prisma.user.update({
      where: { id },
      data: validationResult.data,
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
      message: error,
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No Bearer token provided.",
      });
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET_KEY as Secret;
    const decodedToken = verify(token, secret) as JwtPayload;
    if (decodedToken.id !== id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: You are not allowed to access this resource.",
      });
    }
    await prisma.user.delete({
      where: { id },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "User deleted successfully",
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
  getUserById,
  updateUserById,
  deleteUserById,
};
