import { Router } from "express";
import { productController } from "./product.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router
  .get("/", productController.getProducts)
  .get("/:id", productController.getProductById)
  .post(
    "/",
    auth(Role.admin, Role.super_admin),
    productController.createProduct,
  )
  .patch(
    "/:id",
    auth(Role.admin, Role.super_admin),
    productController.updateProductById,
  )
  .delete(
    "/:id",
    auth(Role.admin, Role.super_admin),
    productController.deleteProductById,
  );

export const productRoutes = router;
