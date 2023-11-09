import { Router } from "express";
import { wishlistController } from "./wishlist.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router
  .post("/", auth(Role.user), wishlistController.createWishlist)
  .get("/:id", auth(Role.user), wishlistController.getWishlist)
  .delete("/:id", auth(Role.user), wishlistController.deleteWishlist);

export const wishlistRoutes = router;
