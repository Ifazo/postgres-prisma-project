import Stripe from "stripe";
import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Product } from "@prisma/client";
import { prisma } from "../../app";
import sendResponse from "../../middlewares/sendResponse";
import verifyToken from "../../middlewares/verifyToken";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface ProductQuantity extends Product {
  quantity: number;
}

const createPayment = async (req: Request, res: Response) => {
  try {
    const { products }: { products: ProductQuantity[] } = req.body;
    if (!products || products.length === 0) {
      return sendResponse(res, 400, false, "Products not provided.");
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendResponse(res, 401, false, "Unauthorized");
    }
    const decodedToken = verifyToken(authHeader);
    if (!decodedToken) {
      return sendResponse(res, 401, false, "Unauthorized");
    }
    const { id, name, email } = decodedToken;
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (!userExists) {
      return sendResponse(res, 404, false, "User not found.");
    }
    const customer = await stripe.customers.create({
      name,
      email,
    });
    const items = products.map((product: ProductQuantity) => ({
      price_data: {
        currency: "usd",
        product_data: {
          images: [product.image],
          name: product.name,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      customer: customer.id,
      success_url: `${process.env.URL}/success`,
      cancel_url: `${process.env.URL}/cancel`,
    });
    if (!session) {
      return sendResponse(res, 500, false, "Payment session creation failed.");
    }
    const result = await prisma.order.create({
      data: {
        products: products.map((product) => ({
          ...product,
          quantity: product.quantity,
        })),
        userId: id,
        total: products.reduce(
          (acc: number, product: ProductQuantity) =>
            acc + product.price * product.quantity,
          0
        ),
        sessionId: session.id,
        status: "pending",
      },
    });
    return sendResponse(res, 201, true, "Payment created successfully", result)
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

export const paymentController = {
  createPayment,
};
