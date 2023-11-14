"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router
    .get("/", post_controller_1.postController.getPosts)
    .get("/:id", post_controller_1.postController.getPost)
    .post("/", (0, auth_1.default)(client_1.Role.admin), post_controller_1.postController.createPost)
    .patch("/:id", (0, auth_1.default)(client_1.Role.admin), post_controller_1.postController.updatePost)
    .delete("/:id", (0, auth_1.default)(client_1.Role.super_admin), post_controller_1.postController.deletePost);
exports.postRoutes = router;
