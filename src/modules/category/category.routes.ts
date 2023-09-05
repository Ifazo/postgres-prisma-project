import { Router } from "express";
import { categoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums";

const router = Router();

router
  .post("/", categoryController.postCategory)
  .get("/", categoryController.getCategory)
  .get("/:id", categoryController.getCategoryById)
  .patch("/:id", categoryController.updateCategoryById)
  .delete("/:id", categoryController.deleteCategoryById);

export const categoryRoutes = router;
