import Stripe from "stripe";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return res.status(200).send({
      success: true,
      message: "Payment Intent created successfully",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

export const paymentController = {
  createPaymentIntent,
};
