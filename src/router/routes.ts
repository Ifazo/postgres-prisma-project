import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { categoryRoutes } from "../modules/category/category.routes";
import { bookRoutes } from "../modules/book/book.routes";
import { reviewRoutes } from "../modules/review/review.routes";

const router = Router();

const routes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
  {
    path: "/books",
    route: bookRoutes,
  },
  {
    path: "/reviews",
    route: reviewRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
