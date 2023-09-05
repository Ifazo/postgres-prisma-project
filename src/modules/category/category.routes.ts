import { Router } from "express";
import { categoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums";

const router = Router();

router
  .post("/", auth(ENUM_USER_ROLE.ADMIN), categoryController.postCategory)
  .get("/", categoryController.getCategory)
  .get("/:id", categoryController.getCategoryById)
  .patch(
    "/:id",
    auth(ENUM_USER_ROLE.ADMIN),
    categoryController.updateCategoryById
  )
  .delete(
    "/:id",
    auth(ENUM_USER_ROLE.ADMIN),
    categoryController.deleteCategoryById
  );

export const categoryRoutes = router;
