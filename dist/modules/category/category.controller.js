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
exports.categoryController = void 0;
const app_1 = require("../../app");
const postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield app_1.prisma.category.create({
            data: req.body,
        });
        return res.status(200).send({
            success: true,
            message: "Category created successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
        });
    }
});
const getCategory = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield app_1.prisma.category.findMany();
        return res.status(200).send({
            success: true,
            message: "Categories get successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
        });
    }
});
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.category.findUnique({
            where: {
                id,
            },
        });
        return res.status(200).send({
            success: true,
            message: "Category get successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
        });
    }
});
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.category.update({
            where: { id },
            data: req.body,
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Category updated successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
        });
    }
});
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.category.delete({
            where: {
                id,
            },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Category deleted successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
        });
    }
});
exports.categoryController = {
    postCategory,
    getCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
};
