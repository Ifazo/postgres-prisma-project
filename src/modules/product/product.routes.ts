import { Router } from "express";
import { productController } from "./product.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router
  .get("/", productController.getProducts)
  .get("/:categoryId/category", productController.getProductByCategory)
  .get("/:id", productController.getProductById)
  .post("/", auth(Role.admin), productController.postProduct)
  .patch("/:id", auth(Role.admin), productController.updateProductById)
  .delete("/:id", auth(Role.admin), productController.deleteProductById);

export const productRoutes = router;
