import { Request, Response } from "express";
import { prisma } from "../../app";

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany();
    return res.status(200).send({
      success: true,
      message: "Orders get successfully",
      data: orders,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Order get successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

export const orderController = {
  getOrders,
  getOrderById,
};
