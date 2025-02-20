import { Request, Response } from "express";
import { prisma } from "../../app";
import { Role } from "@prisma/client";
import { redis } from "../..";

const getUsers = async (_req: Request, res: Response) => {
  try {
    const cacheKey = "users";
    const cachedUsers = await redis.get(cacheKey);

    if (cachedUsers) {
      return res.status(200).send({
        success: true,
        message: "Users retrieved from redis cache successfully",
        data: JSON.parse(cachedUsers),
      });
    }
    const result = await prisma.user.findMany({
      where: { role: Role.user },
    });
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
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
    const cacheKey = "admins";
    const cachedAdmins = await redis.get(cacheKey);

    if (cachedAdmins) {
      return res.status(200).send({
        success: true,
        message: "Admins retrieved from redis cache successfully",
        data: JSON.parse(cachedAdmins),
      });
    }
    const result = await prisma.user.findMany({
      where: { role: Role.admin },
    });
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
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
    const cacheKey = `user:${id}`;
    const cachedUser = await redis.get(cacheKey);

    if (cachedUser) {
      return res.status(200).send({
        success: true,
        message: "User retrieved from redis cache successfully",
        data: JSON.parse(cachedUser),
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
    await redis.set(cacheKey, JSON.stringify(result), { EX: 3600 });
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
    await redis.del(`user:${id}`);
    await redis.del("users");
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
    await redis.del(`user:${id}`);
    await redis.del("users");
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
