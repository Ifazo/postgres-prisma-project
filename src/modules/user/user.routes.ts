import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router
  .get("/", userController.getUsers)
  .get("/:id", userController.getUserById)
  .patch("/:id", userController.updateUserById)
  .delete("/:id", userController.deleteUserById);

export const userRoutes = router;
