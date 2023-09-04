import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

router
  .post("/", categoryController.postCategory)
  .get("/", categoryController.getCategory)
  .get("/:id", categoryController.getCategoryById);

export const categoryRoutes = router;
