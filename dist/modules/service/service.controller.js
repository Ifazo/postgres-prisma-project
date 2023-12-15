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
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
        });
    }
});
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, endDate, category, upcoming, ongoing, ended } = req.query;
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
                message: "Services by date get successfully",
                data: result,
            });
        }
        else if (category) {
            const result = yield app_1.prisma.service.findMany({
                where: {
                    category: category,
                },
            });
            return res.status(200).send({
                success: true,
                message: "Services by category get successfully",
                data: result,
            });
        }
        else if (upcoming) {
            const result = yield app_1.prisma.service.findMany({
                where: {
                    startDate: {
                        gte: new Date(),
                    },
                },
            });
            return res.status(200).send({
                success: true,
                message: "Upcoming services get successfully",
                data: result,
            });
        }
        else if (ongoing) {
            const result = yield app_1.prisma.service.findMany({
                where: {
                    startDate: {
                        lte: new Date(),
                    },
                    endDate: {
                        gte: new Date(),
                    },
                },
            });
            return res.status(200).send({
                success: true,
                message: "Ongoing services get successfully",
                data: result,
            });
        }
        else if (ended) {
            const result = yield app_1.prisma.service.findMany({
                where: {
                    endDate: {
                        lte: new Date(),
                    },
                },
            });
            return res.status(200).send({
                success: true,
                message: "Ended services get successfully",
                data: result,
            });
        }
        else {
            const result = (yield app_1.prisma.service.findMany()).sort((a, b) => {
                return a.startDate.getTime() - b.startDate.getTime();
            });
            return res.status(200).send({
                success: true,
                message: "Services get successfully",
                data: result,
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error,
        });
    }
});
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
