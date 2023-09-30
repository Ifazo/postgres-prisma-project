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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const client_1 = require("@prisma/client");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const pick_1 = __importDefault(require("../../shared/pick"));
const prisma = new client_1.PrismaClient();
const bookOptionsFields = ["page", "size", "sortBy", "sortOrder", "minPrice", "maxPrice"];
const bookFilterableFields = ["search", "title", "author", "genre"];
const postBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma.book.create({
        data: req.body,
    });
    return res.send({
        success: true,
        statusCode: 200,
        message: "Book created successfully",
        data: book,
    });
});
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, bookFilterableFields);
    const options = (0, pick_1.default)(req.query, bookOptionsFields);
    const { page, size, skip, sortBy, sortOrder, minPrice, maxPrice } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    const bookSearchableFields = ["title", "author", "genre"];
    if (search) {
        andConditions.push({
            OR: bookSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const books = yield prisma.book.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: sortBy && sortOrder
            ? { [sortBy]: sortOrder }
            : { title: "asc" },
    });
    const total = yield prisma.book.count();
    const totalPage = Math.ceil(total / size);
    const meta = { page, size, total, totalPage };
    return res.send({
        success: true,
        statusCode: 200,
        message: "Books by search & filters get successfully",
        meta: meta,
        data: books,
    });
});
const getBookByCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const books = yield prisma.book.findMany({
        where: {
            categoryId,
        },
    });
    return res.send({
        success: true,
        statusCode: 200,
        message: "Books with associated category data fetched successfully",
        data: books,
    });
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield prisma.book.findUnique({
        where: {
            id,
        },
    });
    return res.send({
        success: true,
        statusCode: 200,
        message: "Book get successfully",
        data: book,
    });
});
const updateBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield prisma.book.update({
        where: { id },
        data,
    });
    return res.send({
        success: true,
        statusCode: 200,
        message: "Book updated successfully",
        data: result,
    });
});
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield prisma.book.delete({
        where: {
            id,
        },
    });
    return res.send({
        success: true,
        statusCode: 200,
        message: "Book deleted successfully",
        data: result,
    });
});
exports.bookController = {
    postBook,
    getBook,
    getBookByCategoryId,
    getBookById,
    updateBookById,
    deleteBookById,
};
