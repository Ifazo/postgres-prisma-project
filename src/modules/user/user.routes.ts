import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router
  .get("/", auth(Role.admin, Role.super_admin), userController.getUsers)
  .get("/admins", auth(Role.super_admin), userController.getAdmins)
  .get("/:id", auth(Role.admin, Role.super_admin), userController.getUserById)
  .patch(
    "/:id",
    auth(Role.admin, Role.super_admin),
    userController.updateUserById,
  )
  .delete(
    "/:id",
    auth(Role.admin, Role.super_admin),
    userController.deleteUserById,
  );

export const userRoutes = router;
