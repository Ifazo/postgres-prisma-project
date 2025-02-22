import { Router } from "express";
import { orderController } from "./order.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = Router();

router
  .get("/", auth(UserRole.admin), orderController.getOrders)
  .get("/:id", orderController.getOrderById);

export const orderRoutes = router;