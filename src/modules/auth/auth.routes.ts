import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router
  .post("/auth/signup", authController.createUser)
  .post("/auth/signin", authController.loginUser)
  .post("/profile", authController.profile);

export const authRoutes = router;
