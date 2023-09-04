import { Router } from "express";
import { authController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../enums";

const router = Router();

router
  .post("/signup", authController.createUser)
  .post("/signin", authController.loginUser);

export const authRoutes = router;
