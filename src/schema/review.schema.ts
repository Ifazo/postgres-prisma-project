import { z } from "zod";

const reviewSchema = z.object({
  rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5"),
  review: z.string().nonempty("Review is required"),
  productId: z.string().uuid("Product ID must be a valid UUID"),
});

export default reviewSchema;