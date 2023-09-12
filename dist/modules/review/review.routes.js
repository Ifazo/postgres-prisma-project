"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const router = (0, express_1.Router)();
router.post("/", review_controller_1.reviewController.postReview).get("/", review_controller_1.reviewController.getReview);
exports.reviewRoutes = router;
