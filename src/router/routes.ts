import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { categoryRoutes } from "../modules/category/category.routes";
import { reviewRoutes } from "../modules/review/review.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { productRoutes } from "../modules/product/product.routes";
import { paymentRoutes } from "../modules/payment/payment.routes";
import { orderRoutes } from "../modules/order/order.routes";

const router = Router();

const routes = [
  {
    path: "/auth",
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
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/reviews",
    route: reviewRoutes,
  },
  {
    path: "/payments",
    route: paymentRoutes,
  },
  {
    path: "/orders",
    route: orderRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
