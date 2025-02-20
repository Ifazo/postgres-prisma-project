import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/", paymentController.createPaymentIntent);

export const paymentRoutes = router;
