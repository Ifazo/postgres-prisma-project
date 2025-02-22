import { z } from "zod";

const categorySchema = z.object({
  name: z.string().nonempty("Name is required"),
  image: z.string().url("Image must be a valid URL"),
  description: z.string().nonempty("Description is required"),
});

export default categorySchema;