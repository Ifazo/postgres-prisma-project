import { z } from "zod";

const productSchema = z.object({
  name: z.string().nonempty("Name is required"),
  image: z.string().url("Image must be a valid URL"),
  description: z.string().nonempty("Description is required"),
  price: z.number().positive("Price must be a positive number"),
  rating: z
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must be at most 5"),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  categoryId: z.string().uuid("Category ID must be a valid UUID"),
});

export default productSchema;