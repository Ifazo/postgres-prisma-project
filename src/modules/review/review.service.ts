import { PrismaClient, ReviewAndRating } from "@prisma/client";

const prisma = new PrismaClient();

const postReview = async (data: ReviewAndRating): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.create({
    data,
  });
  return result;
};

const getReview = async () => {
  const result = await prisma.reviewAndRating.findMany();
  return {
    data: result,
  };
};

export const reviewService = {
  postReview,
  getReview,
};
