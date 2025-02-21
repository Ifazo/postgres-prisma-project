import { Router } from "express";
import { productController } from "./product.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router
  .get("/", productController.getProducts)
  .post("/", auth(UserRole.seller), productController.createProduct)
  .get("/:id", productController.getProductById)
  .patch("/:id", auth(UserRole.seller), productController.updateProductById)
  .delete("/:id", auth(UserRole.seller), productController.deleteProductById);

export const productRoutes = router;
