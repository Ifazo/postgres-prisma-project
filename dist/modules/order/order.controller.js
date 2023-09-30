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
exports.orderController = void 0;
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const postOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const token = req.headers.authorization;
    const secret = config_1.default.jwt_secret_key;
    const decodedToken = jsonwebtoken_1.default.verify(token, secret);
    const { id } = decodedToken;
    const result = yield prisma.order.create({
        data: Object.assign(Object.assign({}, data), { userId: id }),
    });
    return res.send({
        success: true,
        statusCode: 200,
        message: "Order created successfully",
        data: result,
    });
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const { id, role } = decodedToken;
    if (role === "admin") {
        const result = yield prisma.order.findMany();
        return res.send({
            success: true,
            statusCode: 200,
            message: "Orders get successfully",
            data: result,
        });
    }
    const result = yield prisma.order.findMany({
        where: {
            userId: id,
        },
    });
    return res.send({
        success: true,
        statusCode: 200,
        message: "Orders get successfully",
        data: result,
    });
});
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: orderId } = req.params;
    const token = req.headers.authorization;
    if (!token) {
        return res.send({
            success: false,
            statusCode: 401,
            message: "Unauthorized",
        });
    }
    const order = yield prisma.order.findUnique({
        where: {
            id: orderId,
        },
    });
    const { userId } = order;
    const secret = config_1.default.jwt_secret_key;
    const decodedToken = jsonwebtoken_1.default.verify(token, secret);
    const { id, role } = decodedToken;
    if (role === "admin") {
        const result = yield prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Order get successfully",
            data: result,
        });
    }
    else if (userId === id) {
        const result = yield prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Order get successfully",
            data: result,
        });
    }
    return res.send({
        success: true,
        statusCode: 200,
        message: "Invalid order Id",
    });
});
exports.orderController = {
    postOrder,
    getOrders,
    getOrderById,
};
