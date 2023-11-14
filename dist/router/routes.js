"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const category_routes_1 = require("../modules/category/category.routes");
const service_routes_1 = require("../modules/service/service.routes");
const review_routes_1 = require("../modules/review/review.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const post_routes_1 = require("../modules/post/post.routes");
const wishlist_routes_1 = require("../modules/wishlist/wishlist.routes");
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/auth",
        route: auth_routes_1.authRoutes,
    },
    {
        path: "/users",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/categories",
        route: category_routes_1.categoryRoutes,
    },
    {
        path: "/services",
        route: service_routes_1.serviceRoutes,
    },
    {
        path: "/reviews",
        route: review_routes_1.reviewRoutes,
    },
    {
        path: "/bookings",
        route: booking_routes_1.bookingRoutes,
    },
    {
        path: "/wishlist",
        route: wishlist_routes_1.wishlistRoutes,
    },
    {
        path: "/posts",
        route: post_routes_1.postRoutes,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
