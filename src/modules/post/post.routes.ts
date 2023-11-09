import { Router } from "express";
import { postController } from "./post.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router
  .get("/", postController.getPosts)
  .get("/:id", postController.getPost)
  .post("/", auth(Role.admin), postController.createPost)
  .patch("/:id", auth(Role.admin), postController.updatePost)
  .delete("/:id", auth(Role.super_admin), postController.deletePost);

export const postRoutes = router;
