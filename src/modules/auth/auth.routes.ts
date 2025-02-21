import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router
  .post("/sign-in", authController.signInUser)
  .post("/sign-up", authController.signUpUser)

export const authRoutes = router;
