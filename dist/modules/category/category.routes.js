"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enums_1 = require("../../enums");
const router = (0, express_1.Router)();
router
    .post("/create-category", (0, auth_1.default)(enums_1.USER_ROLE.ADMIN), category_controller_1.categoryController.postCategory)
    .get("/", category_controller_1.categoryController.getCategory)
    .get("/:id", category_controller_1.categoryController.getCategoryById)
    .patch("/:id", (0, auth_1.default)(enums_1.USER_ROLE.ADMIN), category_controller_1.categoryController.updateCategoryById)
    .delete("/:id", (0, auth_1.default)(enums_1.USER_ROLE.ADMIN), category_controller_1.categoryController.deleteCategoryById);
exports.categoryRoutes = router;
