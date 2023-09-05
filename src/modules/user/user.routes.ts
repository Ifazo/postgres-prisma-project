import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums";

const router = Router();

router
  .get("/", auth(ENUM_USER_ROLE.ADMIN), userController.getUsers)
  .get("/:id", auth(ENUM_USER_ROLE.ADMIN), userController.getUserById)
  .patch("/:id", auth(ENUM_USER_ROLE.ADMIN), userController.updateUserById)
  .delete("/:id", auth(ENUM_USER_ROLE.ADMIN), userController.deleteUserById);

export const userRoutes = router;
