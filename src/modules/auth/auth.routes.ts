import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router
  .post("/user", authController.loginUser)
  .get("/profile", authController.getProfile)
  .patch("/profile", authController.updateProfile);

export const authRoutes = router;
