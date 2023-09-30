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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.create({
        data: req.body,
    });
    return res.send({
        success: true,
        statusCode: 200,
        message: "Category created successfully",
        data: result,
    });
});
const getCategory = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.category.findMany();
    return res.send({
        success: true,
        statusCode: 200,
        message: "Categories get successfully",
        data: result,
    });
});
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield prisma.category.findUnique({
        where: {
            id,
        },
    });
    return res.send({
        success: true,
        statusCode: 200,
        message: "Category get successfully",
        data: result,
    });
});
const updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield prisma.category.update({
        where: { id },
        data: req.body,
    });
    return res.send({
        success: true,
        statusCode: 200,
        message: "Category updated successfully",
        data: result,
    });
});
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield prisma.category.delete({
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
});
exports.categoryController = {
    postCategory,
    getCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
};
