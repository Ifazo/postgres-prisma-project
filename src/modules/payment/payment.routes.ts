import { Router } from "express";
import { paymentController } from "./payment.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", auth(UserRole.buyer), paymentController.createPayment);

export const paymentRoutes = router;
