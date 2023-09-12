"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enums_1 = require("../../enums");
const router = (0, express_1.Router)();
router
    .get("/", (0, auth_1.default)(enums_1.USER_ROLE.ADMIN), user_controller_1.userController.getUsers)
    .get("/:id", (0, auth_1.default)(enums_1.USER_ROLE.ADMIN), user_controller_1.userController.getUserById)
    .patch("/:id", (0, auth_1.default)(enums_1.USER_ROLE.ADMIN), user_controller_1.userController.updateUserById)
    .delete("/:id", (0, auth_1.default)(enums_1.USER_ROLE.ADMIN), user_controller_1.userController.deleteUserById);
exports.userRoutes = router;
