import { Router } from "express";
import { reviewController } from "./review.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = Router();

router
.get("/", reviewController.getReviews)
  .post("/", auth(UserRole.buyer), reviewController.createReview)
  .patch("/:id", auth(UserRole.buyer), reviewController.updateReview)
  .delete("/:id", auth(UserRole.buyer), reviewController.deleteReview);

export const reviewRoutes = router;
