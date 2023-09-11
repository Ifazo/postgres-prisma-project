import { Router } from "express";
import { bookController } from "./book.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../enums";

const router = Router()

router
  .post("/create-book", auth(USER_ROLE.ADMIN), bookController.postBook)
  .get("/", bookController.getBook)
  .get("/:categoryId/category", bookController.getBookByCategoryId)
  .get("/:id", bookController.getBookById)
  .patch("/:id", auth(USER_ROLE.ADMIN), bookController.updateBookById)
  .delete("/:id", auth(USER_ROLE.ADMIN), bookController.deleteBookById);

export const bookRoutes = router