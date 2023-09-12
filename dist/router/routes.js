"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const category_routes_1 = require("../modules/category/category.routes");
const book_routes_1 = require("../modules/book/book.routes");
const review_routes_1 = require("../modules/review/review.routes");
const order_routes_1 = require("../modules/order/order.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/",
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
        path: "/books",
        route: book_routes_1.bookRoutes,
    },
    {
        path: "/reviews",
        route: review_routes_1.reviewRoutes,
    },
    {
        path: "/orders",
        route: order_routes_1.orderRoutes,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
