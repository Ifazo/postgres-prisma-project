"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const app_1 = require("../../app");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield app_1.prisma.post.create({
            data: req.body,
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Post created successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
});
const getPosts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield app_1.prisma.post.findMany();
        return res.send({
            success: true,
            statusCode: 200,
            message: "Post get successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
});
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.post.findUnique({
            where: {
                id,
            },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Post get successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.post.update({
            where: {
                id,
            },
            data: req.body,
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Post updated successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.post.delete({
            where: {
                id,
            },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Post deleted successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.postController = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
};
