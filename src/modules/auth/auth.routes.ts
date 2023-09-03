import { Router } from "express";
import { authController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../enums";

const router = Router();

router
  .post("/signup", auth(USER_ROLE.USER), authController.createUser)
  .post("/signin", auth(USER_ROLE.USER), authController.loginUser);

export const authRoutes = router;
