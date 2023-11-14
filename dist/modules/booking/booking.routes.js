"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router
    .post("/", (0, auth_1.default)(client_1.Role.user), booking_controller_1.bookingController.createBooking)
    .get("/", (0, auth_1.default)(client_1.Role.user, client_1.Role.admin), booking_controller_1.bookingController.getBookings)
    .get("/:id", (0, auth_1.default)(client_1.Role.user, client_1.Role.admin), booking_controller_1.bookingController.getBooking)
    .delete("/:id", (0, auth_1.default)(client_1.Role.user, client_1.Role.admin), booking_controller_1.bookingController.deleteBooking);
exports.bookingRoutes = router;
