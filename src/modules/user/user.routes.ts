import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/", userController.postUser).get("/", userController.getUser);

export const userRoutes = router;
