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
exports.wishlistController = void 0;
const app_1 = require("../../app");
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const token = req.headers.authorization;
        const secret = config_1.default.jwt_secret_key;
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        const { email } = decodedToken;
        data.user = email;
        const result = yield app_1.prisma.wishlist.create({
            data,
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Wishlist created successfully",
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
const userWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const secret = config_1.default.jwt_secret_key;
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        const { email } = decodedToken;
        const result = yield app_1.prisma.wishlist.findMany({
            where: {
                user: email,
            },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Wishlist get successfully",
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
const getWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.wishlist.findUnique({
            where: {
                id,
            },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Wishlist get successfully",
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
const deleteWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.wishlist.delete({
            where: {
                id,
            },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Wishlist deleted successfully",
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
exports.wishlistController = {
    createWishlist,
    userWishlist,
    getWishlist,
    deleteWishlist,
};
