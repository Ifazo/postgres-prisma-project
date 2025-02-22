import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router
  .get("/", auth(UserRole.admin), userController.getUsers)
  .get("/:id", userController.getUserById)
  .patch("/:id", userController.updateUserById)
  .delete("/:id", userController.deleteUserById);

export const userRoutes = router;
