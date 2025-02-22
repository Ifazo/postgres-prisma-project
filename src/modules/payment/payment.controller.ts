import Stripe from "stripe";
import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Product } from "@prisma/client";
import { prisma } from "../../app";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface ProductQuantity extends Product {
  quantity: number;
}

const createPayment = async (req: Request, res: Response) => {
  try {
    const { products }: { products: ProductQuantity[] } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Products are required.",
      });
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No Bearer token provided.",
      });
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET_KEY as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const { name, email } = decodedToken;
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (!userExists) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
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
      return res.status(500).send({
        success: false,
        message: "Failed to create payment session.",
      });
    }
    const order = await prisma.order.create({
      data: {
        products: products.map((product) => ({
          ...product,
          quantity: product.quantity,
        })),
        userName: name,
        userEmail: email,
        total: products.reduce(
          (acc: number, product: ProductQuantity) =>
            acc + product.price * product.quantity,
          0
        ),
        sessionId: session.id,
        status: "pending",
      },
    });
    return res.status(201).send({
      success: true,
      message: "Payment session created successfully.",
      userName: name,
      userEmail: email,
      sessionId: session.id,
      orderId: order.id,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const paymentController = {
  createPayment,
};
