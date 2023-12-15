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
exports.bookingController = void 0;
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../../app");
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const token = req.headers.authorization;
        const secret = config_1.default.jwt_secret_key;
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        const { email } = decodedToken;
        data.user = email;
        const result = yield app_1.prisma.booking.create({
            data,
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Booking created successfully",
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
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.send({
                success: false,
                statusCode: 401,
                message: "Unauthorized",
            });
        }
        const secret = config_1.default.jwt_secret_key;
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        const { email, role } = decodedToken;
        if (role === "admin") {
            const result = yield app_1.prisma.booking.findMany();
            return res.send({
                success: true,
                statusCode: 200,
                message: "Bookings get successfully",
                data: result,
            });
        }
        const result = yield app_1.prisma.booking.findMany({
            where: {
                user: email,
            },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Bookings get successfully",
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
const getBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;
        if (!token) {
            return res.send({
                success: false,
                statusCode: 401,
                message: "Unauthorized",
            });
        }
        const booking = yield app_1.prisma.booking.findUnique({
            where: {
                id,
            },
        });
        const { user } = booking;
        const secret = config_1.default.jwt_secret_key;
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        const { email, role } = decodedToken;
        if (role === "admin" || email === user) {
            const result = yield app_1.prisma.booking.findUnique({
                where: {
                    id,
                },
            });
            return res.send({
                success: true,
                statusCode: 200,
                message: "Booking get successfully",
                data: result,
            });
        }
        else {
            return res.status(401).send({
                success: false,
                message: "Invalid request",
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
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;
        if (!token) {
            return res.send({
                success: false,
                statusCode: 401,
                message: "Unauthorized",
            });
        }
        const booking = yield app_1.prisma.booking.findUnique({
            where: {
                id,
            },
        });
        const { user } = booking;
        const secret = config_1.default.jwt_secret_key;
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        const { email, role } = decodedToken;
        if (role === "admin") {
            const result = yield app_1.prisma.booking.delete({
                where: {
                    id,
                },
            });
            return res.send({
                success: true,
                statusCode: 200,
                message: "Booking deleted successfully",
                data: result,
            });
        }
        else if (user === email) {
            const result = yield app_1.prisma.booking.delete({
                where: {
                    id,
                },
            });
            return res.send({
                success: true,
                statusCode: 200,
                message: "Booking deleted successfully",
                data: result,
            });
        }
        return res.send({
            success: true,
            statusCode: 200,
            message: "Invalid Booking Id",
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
exports.bookingController = {
    createBooking,
    getBookings,
    getBooking,
    deleteBooking,
};
