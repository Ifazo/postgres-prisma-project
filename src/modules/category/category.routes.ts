import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

router
  .post("/", categoryController.postCategory)
  .get("/", categoryController.getCategory);

export const categoryRoutes = router;
