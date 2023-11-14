"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = require("express");
const service_controller_1 = require("./service.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router
    .get("/", service_controller_1.serviceController.getServices)
    .get("/:id", service_controller_1.serviceController.getServiceById)
    .post("/", (0, auth_1.default)(client_1.Role.admin), service_controller_1.serviceController.createService)
    .patch("/:id", (0, auth_1.default)(client_1.Role.admin), service_controller_1.serviceController.updateServiceById)
    .delete("/:id", (0, auth_1.default)(client_1.Role.admin), service_controller_1.serviceController.deleteServiceById);
exports.serviceRoutes = router;
