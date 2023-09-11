import { Router } from "express";
import { categoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../enums";

const router = Router();

router
  .post(
    "/create-category",
    auth(USER_ROLE.ADMIN),
    categoryController.postCategory
  )
  .get("/", categoryController.getCategory)
  .get("/:id", categoryController.getCategoryById)
  .patch("/:id", auth(USER_ROLE.ADMIN), categoryController.updateCategoryById)
  .delete("/:id", auth(USER_ROLE.ADMIN), categoryController.deleteCategoryById);

export const categoryRoutes = router;
