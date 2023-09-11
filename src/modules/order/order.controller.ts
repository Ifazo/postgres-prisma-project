import { Order } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { orderService } from "./order.service";
import { Request, Response } from "express";

const postOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.postOrder(req.body);
  sendResponse<Order>(res, {
    success: true,
    statusCode: 200,
    message: "Order created successfully",
    data: result,
  });
});

const getOrder = catchAsync(async (_req: Request, res: Response) => {
  const result = await orderService.getOrder();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Orders get successfully",
    data: result,
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await orderService.getOrderById(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Order get successfully",
    data: result,
  });
});

export const orderController = {
  postOrder,
  getOrder,
  getOrderById,
};
