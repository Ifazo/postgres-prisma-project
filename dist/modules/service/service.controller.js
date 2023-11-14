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
exports.serviceController = void 0;
const app_1 = require("../../app");
// const bookOptionsFields: string[] = ["page", "size", "sortBy", "sortOrder", "minPrice", "maxPrice"];
// const bookFilterableFields: string[] = ["search", "title", "author", "genre"];
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield app_1.prisma.service.create({
            data: req.body,
        });
        return res.status(200).send({
            success: true,
            message: "Service created successfully",
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
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate } = req.query;
        if (startDate && endDate) {
            const result = yield app_1.prisma.service.findMany({
                where: {
                    startDate: {
                        gte: new Date(startDate),
                    },
                    endDate: {
                        lte: new Date(endDate),
                    },
                },
            });
            return res.status(200).send({
                success: true,
                message: "Services get successfully",
                data: result,
            });
        }
        const result = yield app_1.prisma.service.findMany();
        return res.status(200).send({
            success: true,
            message: "Services get successfully",
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
// const filters = pick(req.query, bookFilterableFields) as IBookFilterRequest;
// const options = pick(req.query, bookOptionsFields) as IPaginationOptions;
// const { page, size, skip, sortBy, sortOrder, minPrice, maxPrice } =
//   paginationHelpers.calculatePagination(options);
// const { search, ...filterData } = filters;
// const andConditions = [];
// const bookSearchableFields: string[] = [ "title", "author", "genre" ];
// if (search) {
//   andConditions.push({
//     OR: bookSearchableFields.map((field) => ({
//       [field]: {
//         contains: search,
//         mode: "insensitive",
//       },
//     })),
//   });
// }
// if (Object.keys(filterData).length > 0) {
//   andConditions.push({
//     AND: Object.keys(filterData).map((key) => ({
//       [key]: {
//         equals: (filterData as any)[key],
//       },
//     })),
//   });
// }
// const whereConditions: Prisma.ProductWhereInput =
//   andConditions.length > 0 ? { AND: andConditions } : {};
// const books = await prisma.product.findMany({
//   where: whereConditions,
//   skip,
//   take: size,
//   orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { name: "asc" },
// });
// const total = await prisma.product.count();
// const totalPage = Math.ceil(total / size);
// const meta = { page, size, total, totalPage };
// return res.send({
//   success: true,
//   statusCode: 200,
//   message: "Products by search & filters get successfully",
//   meta: meta,
//   data: books,
// });
const getServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.service.findUnique({
            where: {
                id,
            },
        });
        return res.status(200).send({
            success: true,
            message: "Service get successfully",
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
const updateServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = yield app_1.prisma.service.update({
            where: { id },
            data,
        });
        return res.status(200).send({
            success: true,
            message: "Service updated successfully",
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
const deleteServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.service.delete({
            where: {
                id,
            },
        });
        return res.status(200).send({
            success: true,
            message: "Service deleted successfully",
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
exports.serviceController = {
    createService,
    getServices,
    getServiceById,
    updateServiceById,
    deleteServiceById,
};
