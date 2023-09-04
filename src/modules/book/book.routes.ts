import { Router } from "express";
import { bookController } from "./book.controller";

const router = Router()

router
  .post("/", bookController.postBook)
  .get("/", bookController.getBook)
  .get("/:id", bookController.getBookById)
  .patch("/:id", bookController.updateBookById)
  .delete("/:id", bookController.deleteBookById);

export const bookRoutes = router