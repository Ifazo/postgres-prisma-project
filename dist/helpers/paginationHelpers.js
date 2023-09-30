"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
const calculatePagination = (options) => {
    const page = Number(options.page || 1);
    const size = Number(options.size || 5);
    const skip = (page - 1) * size;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "asc";
    const minPrice = Number(options.minPrice || 200);
    const maxPrice = Number(options.maxPrice || 400);
    return {
        page,
        size,
        skip,
        sortBy,
        sortOrder,
        minPrice,
        maxPrice,
    };
};
exports.paginationHelpers = {
    calculatePagination,
};
