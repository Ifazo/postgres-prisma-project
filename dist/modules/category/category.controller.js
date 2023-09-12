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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const category_service_1 = require("./category.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const postCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryService.postCategory(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Category created successfully",
        data: result,
    });
}));
const getCategory = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryService.getCategory();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Categories get successfully",
        data: result,
    });
}));
const getCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield category_service_1.categoryService.getCategoryById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Category get successfully",
        data: result,
    });
}));
const updateCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield category_service_1.categoryService.updateCategoryById(id, data);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Category updated successfully",
        data: result,
    });
}));
const deleteCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield category_service_1.categoryService.deleteCategoryById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Category deleted successfully",
        data: result,
    });
}));
exports.categoryController = {
    postCategory,
    getCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
};
