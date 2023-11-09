import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router
  .post("/", auth(Role.user), bookingController.createBooking)
  .get("/", auth(Role.user, Role.admin), bookingController.getBookings)
  .get("/:id", auth(Role.user, Role.admin), bookingController.getBooking)
  .delete("/:id", auth(Role.user, Role.admin), bookingController.deleteBooking);

export const bookingRoutes = router;
