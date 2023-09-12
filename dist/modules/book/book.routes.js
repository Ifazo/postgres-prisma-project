"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enums_1 = require("../../enums");
const router = (0, express_1.Router)();
router
    .post("/create-book", (0, auth_1.default)(enums_1.USER_ROLE.ADMIN), book_controller_1.bookController.postBook)
    .get("/", book_controller_1.bookController.getBook)
    .get("/:categoryId/category", book_controller_1.bookController.getBookByCategoryId)
    .get("/:id", book_controller_1.bookController.getBookById)
    .patch("/:id", (0, auth_1.default)(enums_1.USER_ROLE.ADMIN), book_controller_1.bookController.updateBookById)
    .delete("/:id", (0, auth_1.default)(enums_1.USER_ROLE.ADMIN), book_controller_1.bookController.deleteBookById);
exports.bookRoutes = router;
