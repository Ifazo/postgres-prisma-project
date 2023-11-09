import { Router } from "express";
import { reviewController } from "./review.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router
  .post("/", auth(Role.user), reviewController.postReview)
  .get("/:id", reviewController.getReviews)
  .patch("/:id", auth(Role.user), reviewController.updateReview)
  .delete("/:id", auth(Role.user, Role.admin), reviewController.deleteReview);

export const reviewRoutes = router;
