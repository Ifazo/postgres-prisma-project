"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router
    .post("/", auth_controller_1.authController.loginUser)
    .get("/profile", auth_controller_1.authController.getProfile)
    .patch("/profile", auth_controller_1.authController.updateProfile);
exports.authRoutes = router;
