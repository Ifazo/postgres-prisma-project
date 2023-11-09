import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const createAdmin = async (req: Request, res: Response) => {
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
};

const getAdmins = async (_req: Request, res: Response) => {
  const result = await prisma.admin.findMany();

  return res.send({
    success: true,
    statusCode: 200,
    message: "Admins get successfully",
    data: result,
  });
};

const getAdmin = async (req: Request, res: Response) => {
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
};

const deleteAdmin = async (req: Request, res: Response) => {
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
};

export const adminController = {
  createAdmin,
  getAdmins,
  getAdmin,
  deleteAdmin,
};
