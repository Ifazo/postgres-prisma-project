import { Router } from "express";
import { reviewController } from "./review.controller";

const router = Router();

router.post("/", reviewController.postReview).get("/", reviewController.getReview);

export const reviewRoutes = router;
