import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router
  .post("/", auth(Role.user), orderController.postOrder)
  .get("/", auth(Role.user, Role.admin), orderController.getOrders)
  .get("/:id", auth(Role.user, Role.admin), orderController.getOrderById)
  .delete("/:id", auth(Role.user, Role.admin), orderController.deleteOrderById);

export const orderRoutes = router;
