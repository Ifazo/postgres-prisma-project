"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router
    .post("/auth/signup", auth_controller_1.authController.createUser)
    .post("/auth/signin", auth_controller_1.authController.loginUser)
    .get("/profile", auth_controller_1.authController.profile);
exports.authRoutes = router;
