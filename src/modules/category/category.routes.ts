import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

router
  .post("/", categoryController.postCategory)
  .get("/", categoryController.getCategory)
  .get("/:id", categoryController.getCategoryById)
  .patch("/:id", categoryController.updateCategoryById)
  .delete("/:id", categoryController.deleteCategoryById);

export const categoryRoutes = router;
