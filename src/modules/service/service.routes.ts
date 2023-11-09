import { Router } from "express";
import { serviceController } from "./service.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router
  .get("/", serviceController.getServices)
  .get("/:id", serviceController.getServiceById)
  .post("/", auth(Role.admin), serviceController.createService)
  .patch("/:id", auth(Role.admin), serviceController.updateServiceById)
  .delete("/:id", auth(Role.admin), serviceController.deleteServiceById);

export const serviceRoutes = router;
