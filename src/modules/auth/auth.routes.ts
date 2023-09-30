import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router
  .post("/auth/signin", authController.loginUser)
  .post("/auth/signup", authController.createUser)
  .get("/profile", authController.profile);

export const authRoutes = router;
