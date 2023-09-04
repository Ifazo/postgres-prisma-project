import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router();

router
  .post("/", orderController.postOrder)
  .get("/", orderController.getOrder)
  .get("/:id", orderController.getOrderById);

export const orderRoutes = router;
