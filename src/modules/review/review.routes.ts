import { Router } from "express";
import { reviewController } from "./review.controller";

const router = Router();

router
  .post("/", reviewController.createReview)
  .get("/:id", reviewController.getReviews)
  .patch("/:id", reviewController.updateReview)
  .delete("/:id", reviewController.deleteReview);

export const reviewRoutes = router;
