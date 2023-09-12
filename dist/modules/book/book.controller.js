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
exports.bookController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const book_service_1 = require("./book.service");
const pick_1 = __importDefault(require("../../shared/pick"));
const postBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.bookService.postBook(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Book created successfully",
        data: result,
    });
}));
const bookOptionsFields = ["page", "size", "sortBy", "sortOrder"];
const bookFilterableFields = [
    "searchTerm",
    "title",
    "author",
    "genre",
];
const getBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, bookFilterableFields);
    const options = (0, pick_1.default)(req.query, bookOptionsFields);
    const result = yield book_service_1.bookService.getBook(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Books by search & filters get successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getBookByCategoryId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const result = yield book_service_1.bookService.getBookByCategoryId(categoryId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Books with associated category data fetched successfully",
        data: result,
    });
}));
const getBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield book_service_1.bookService.getBookById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Book get successfully",
        data: result,
    });
}));
const updateBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield book_service_1.bookService.updateBookById(id, data);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Book updated successfully",
        data: result,
    });
}));
const deleteBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield book_service_1.bookService.deleteBookById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Book deleted successfully",
        data: result,
    });
}));
exports.bookController = {
    postBook,
    getBook,
    getBookByCategoryId,
    getBookById,
    updateBookById,
    deleteBookById,
};
