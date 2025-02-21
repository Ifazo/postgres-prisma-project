import { Router } from "express";
import { categoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router
  .get("/", categoryController.getCategories)
  .post("/", auth(UserRole.admin), categoryController.postCategory)
  .get("/:id", categoryController.getCategoryById)
  .patch("/:id", auth(UserRole.admin), categoryController.updateCategoryById)
  .delete("/:id", auth(UserRole.admin), categoryController.deleteCategoryById);

export const categoryRoutes = router;
