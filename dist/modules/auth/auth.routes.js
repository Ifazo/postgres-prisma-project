"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router
    .post("/sign-in", auth_controller_1.authController.signInUser)
    .post("/sign-up", auth_controller_1.authController.signUpUser)
    .post("/token", auth_controller_1.authController.refreshToken);
exports.authRoutes = router;
