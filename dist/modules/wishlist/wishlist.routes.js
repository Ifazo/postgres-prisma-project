"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistRoutes = void 0;
const express_1 = require("express");
const wishlist_controller_1 = require("./wishlist.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router
    .post("/", (0, auth_1.default)(client_1.Role.user), wishlist_controller_1.wishlistController.createWishlist)
    .get("/", (0, auth_1.default)(client_1.Role.user), wishlist_controller_1.wishlistController.userWishlist)
    .get("/:id", (0, auth_1.default)(client_1.Role.user), wishlist_controller_1.wishlistController.getWishlist)
    .delete("/:id", (0, auth_1.default)(client_1.Role.user), wishlist_controller_1.wishlistController.deleteWishlist);
exports.wishlistRoutes = router;
