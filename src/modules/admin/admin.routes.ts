import { Router } from "express";
import { adminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router
  .get("/", auth(Role.super_admin), adminController.getAdmins)
  .get("/:id", auth(Role.super_admin), adminController.getAdmin)
  .post("/", auth(Role.super_admin), adminController.createAdmin)
  .delete("/:id", auth(Role.super_admin), adminController.deleteAdmin);

export const adminRoutes = router;
