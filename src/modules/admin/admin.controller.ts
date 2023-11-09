import { Request, Response } from "express";
import { prisma } from "../../app";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const adminExists = await prisma.admin.findUnique({
      where: { email },
    });
    if (adminExists) {
      return res.status(400).send({
        success: false,
        message: "Admin already exists",
      });
    }
    const admin = await prisma.admin.create({
      data: req.body,
    });
    return res.status(200).send({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const getAdmins = async (_req: Request, res: Response) => {
  try {
    const result = await prisma.admin.findMany();
    return res.send({
      success: true,
      statusCode: 200,
      message: "Admins get successfully",
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

const getAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.admin.findUnique({
      where: {
        id,
      },
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
      message: "Internal server error",
      error,
    });
  }
};

const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.admin.delete({
      where: {
        id,
      },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Admin deleted successfully",
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

export const adminController = {
  createAdmin,
  getAdmins,
  getAdmin,
  deleteAdmin,
};
