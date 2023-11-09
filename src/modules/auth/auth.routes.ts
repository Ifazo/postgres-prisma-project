import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router
  .post("/user", authController.loginUser)
  .post("/admin", authController.loginAdmin)
  .get("/profile", authController.getProfile)
  .patch("/profile", authController.updateProfile);

export const authRoutes = router;
