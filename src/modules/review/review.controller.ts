import { ReviewAndRating } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { Request, Response } from "express";
import { reviewService } from "./review.service";

const postReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.postReview(req.body);
  sendResponse<ReviewAndRating>(res, {
    success: true,
    statusCode: 200,
    message: "Review created successfully",
    data: result,
  });
});

const getReview = catchAsync(async (_req: Request, res: Response) => {
  const result = await reviewService.getReview();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Review get successfully",
    data: result,
  });
});

export const reviewController = {
  postReview,
  getReview,
};
