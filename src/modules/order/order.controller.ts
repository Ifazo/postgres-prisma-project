import { Order } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { orderService } from "./order.service";
import { Request, Response } from "express";
import config from "../../config";
import jwt, { Secret } from "jsonwebtoken";

const postOrder = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const secret = config.jwt_secret_key as Secret;
  const decodedToken = jwt.verify(token, secret) as Order;
  console.log(decodedToken)
  const { id } = decodedToken;
  const result = await orderService.postOrder(req.body);
  sendResponse<Order>(res, {
    success: true,
    statusCode: 200,
    message: "Order created successfully",
    data: result,
  });
};

const getOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getOrder(req);
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
