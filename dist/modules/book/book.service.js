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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const client_1 = require("@prisma/client");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const prisma = new client_1.PrismaClient();
const postBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.create({
        data,
    });
    return result;
});
const getBook = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    console.log(filterData);
    const andConditions = [];
    const bookSearchableFields = ["title", "author", "genre"];
    if (searchTerm) {
        andConditions.push({
            OR: bookSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
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
    const result = yield prisma.book.findMany({
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { title: "asc" },
    });
    const total = yield prisma.book.count();
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const getBookByCategoryId = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.findMany({
        where: {
            categoryId,
        },
    });
    return result;
});
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateBookById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.update({
        where: { id },
        data,
    });
    return result;
});
const deleteBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.bookService = {
    postBook,
    getBook,
    getBookByCategoryId,
    getBookById,
    updateBookById,
    deleteBookById,
};
