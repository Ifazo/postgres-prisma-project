import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../enums";

const router = Router();

router
  .get("/", auth(USER_ROLE.ADMIN), userController.getUsers)
  .get("/:id", auth(USER_ROLE.ADMIN), userController.getUserById)
  .patch("/:id", userController.updateUserById)
  .delete("/:id", auth(USER_ROLE.ADMIN), userController.deleteUserById);

export const userRoutes = router;
