import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router();

router
  .get("/", orderController.getOrders)
  .get("/:id", orderController.getOrderById);

export const orderRoutes = router;