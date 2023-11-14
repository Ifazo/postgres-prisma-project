"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router
    .post("/", (0, auth_1.default)(client_1.Role.user), review_controller_1.reviewController.postReview)
    .get("/:id", review_controller_1.reviewController.getReviews)
    .patch("/:id", (0, auth_1.default)(client_1.Role.user), review_controller_1.reviewController.updateReview)
    .delete("/:id", (0, auth_1.default)(client_1.Role.user, client_1.Role.admin), review_controller_1.reviewController.deleteReview);
exports.reviewRoutes = router;
