import { Request, Response } from "express";
import { prisma } from "../../app";
import { UserRole } from "@prisma/client";
import { JwtPayload, Secret, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import userSchema from "../../schema/user.schema";
import sendResponse from "../../middlewares/sendResponse";
import verifyToken from "../../middlewares/verifyToken";

dotenv.config();

const userUpdateSchema = userSchema.partial();

const getUsers = async (req: Request, res: Response) => {
  try {
    const { role } = req.query;
    if (!role) {
      return sendResponse(res, 400, false, "Role not provided");
    }
    const result = await prisma.user.findMany({
      where: {
        role: role as UserRole,
      },
    });
    return sendResponse(res, 200, true, "Users retrieved successfully", result);
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse(
        res,
        401,
        false,
        "Unauthorized: No Bearer token provided."
      );
    }
    const decodedToken = verifyToken(authHeader);
    if (!decodedToken) {
      return sendResponse(res, 401, false, "Unauthorized");
    }
    if (decodedToken.id !== id) {
      return sendResponse(
        res,
        401,
        false,
        "Unauthorized: You are not allowed to access this resource."
      );
    }
    const result = await prisma.user.findUnique({
      where: { id },
    });
    if (!result) {
      return sendResponse(res, 404, false, "User not found");
    }
    return sendResponse(res, 200, true, "User retrieved successfully", result);
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse(
        res,
        401,
        false,
        "Unauthorized: No Bearer token provided."
      );
    }
    const decodedToken = verifyToken(authHeader);
    if (!decodedToken) {
      return sendResponse(res, 401, false, "Unauthorized");
    }
    if (decodedToken.id !== id) {
      return sendResponse(
        res,
        401,
        false,
        "Unauthorized: You are not allowed to access this resource."
      );
    }
    const validationResult = userUpdateSchema.safeParse(req.body);
    if (!validationResult.success) {
      return sendResponse(res, 400, false, validationResult.error.errors);
    }
    const result = await prisma.user.update({
      where: { id },
      data: validationResult.data,
    });
    return sendResponse(res, 200, true, "User updated successfully", result);
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse(
        res,
        401,
        false,
        "Unauthorized: No Bearer token provided."
      );
    }
    const decodedToken = verifyToken(authHeader);
    if (!decodedToken) {
      return sendResponse(res, 401, false, "Unauthorized");
    }
    if (decodedToken.id !== id) {
      return sendResponse(
        res,
        401,
        false,
        "Unauthorized: You are not allowed to access this resource."
      );
    }
    await prisma.user.delete({
      where: { id },
    });
    return sendResponse(res, 200, true, "User deleted successfully");
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

export const userController = {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
