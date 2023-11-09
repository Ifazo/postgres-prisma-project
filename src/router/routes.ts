import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { categoryRoutes } from "../modules/category/category.routes";
import { serviceRoutes } from "../modules/service/service.routes";
import { reviewRoutes } from "../modules/review/review.routes";
import { bookingRoutes } from "../modules/booking/booking.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { postRoutes } from "../modules/post/post.routes";
import { wishlistRoutes } from "../modules/wishlist/wishlist.routes";

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
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
  {
    path: "/services",
    route: serviceRoutes,
  },
  {
    path: "/reviews",
    route: reviewRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
  {
    path: "/wishlist",
    route: wishlistRoutes,
  },
  {
    path: "/posts",
    route: postRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
