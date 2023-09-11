import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { categoryRoutes } from "../modules/category/category.routes";
import { bookRoutes } from "../modules/book/book.routes";
import { reviewRoutes } from "../modules/review/review.routes";
import { orderRoutes } from "../modules/order/order.routes";
import { authRoutes } from "../modules/auth/auth.routes";

const router = Router();

const routes = [
  {
    path: "/",
    route: authRoutes,
  },
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
  {
    path: "/orders",
    route: orderRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
