import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router
  .post("/sign-in", authController.signInUser)
  .post("/sign-up", authController.signUpUser)
  .get("/profile", authController.getUserProfile)
  .patch("/profile", authController.updateUserProfile)
  .delete("/profile", authController.deleteUserProfile)

export const authRoutes = router;
