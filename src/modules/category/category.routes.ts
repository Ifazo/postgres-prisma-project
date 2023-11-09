import { Router } from "express";
import { categoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router
  .post("/", auth(Role.admin), categoryController.postCategory)
  .get("/", categoryController.getCategory)
  .get("/:id", categoryController.getCategoryById)
  .patch("/:id", auth(Role.admin), categoryController.updateCategoryById)
  .delete("/:id", auth(Role.admin), categoryController.deleteCategoryById);

export const categoryRoutes = router;
