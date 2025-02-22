import { z } from "zod";

const userSchema = z.object({
  name: z.string().nonempty("Name is required").optional(),
  image: z.string().url("Image must be a valid URL").optional(),
  email: z.string().email("Email must be a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["admin", "seller", "buyer"]).optional(),
});

export default userSchema;