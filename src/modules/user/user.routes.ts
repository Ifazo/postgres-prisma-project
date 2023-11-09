import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router
  .post("/", userController.createUser)
  .get("/", auth(Role.admin), userController.getUsers)
  .get("/:id", auth(Role.admin), userController.getUserById)
  .patch("/:id", auth(Role.admin), userController.updateUserById)
  .delete("/:id", auth(Role.admin), userController.deleteUserById);

export const userRoutes = router;
