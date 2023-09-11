import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../enums";

const router = Router();

router
  .post("/create-order", auth(USER_ROLE.CUSTOMER), orderController.postOrder)
  .get("/", orderController.getOrder)
  .get("/:id", orderController.getOrderById);

export const orderRoutes = router;
