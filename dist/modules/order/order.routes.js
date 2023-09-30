"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enums_1 = require("../../enums");
const router = (0, express_1.Router)();
router
    .post("/create-order", (0, auth_1.default)(enums_1.USER_ROLE.CUSTOMER), order_controller_1.orderController.postOrder)
    .get("/", (0, auth_1.default)(enums_1.USER_ROLE.ADMIN, enums_1.USER_ROLE.CUSTOMER), order_controller_1.orderController.getOrders)
    .get("/:id", (0, auth_1.default)(enums_1.USER_ROLE.ADMIN, enums_1.USER_ROLE.CUSTOMER), order_controller_1.orderController.getOrderById);
exports.orderRoutes = router;
