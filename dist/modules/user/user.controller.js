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
exports.userController = void 0;
const app_1 = require("../../app");
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield app_1.prisma.user.findMany({
            where: { role: client_1.Role.user },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Users get successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
});
const getAdmins = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield app_1.prisma.user.findMany({
            where: { role: client_1.Role.admin },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Admin get successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;
        const secret = config_1.default.jwt_secret_key;
        const decodedToken = (0, jsonwebtoken_1.verify)(token, secret);
        if (decodedToken.role === client_1.Role.user) {
            if (decodedToken.id !== id) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized",
                });
            }
        }
        const user = yield app_1.prisma.user.findUnique({
            where: { id },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "User get successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
});
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const token = req.headers.authorization;
        const secret = config_1.default.jwt_secret_key;
        const decodedToken = (0, jsonwebtoken_1.verify)(token, secret);
        if (decodedToken.role === client_1.Role.user) {
            if (decodedToken.id !== id) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized",
                });
            }
        }
        const user = yield app_1.prisma.user.update({
            where: { id },
            data,
        });
        return res.status(200).send({
            success: true,
            message: "User updated successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
});
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.user.delete({
            where: {
                id,
            },
        });
        return res.status(200).send({
            success: true,
            message: "User deleted successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
});
exports.userController = {
    getUsers,
    getAdmins,
    getUserById,
    updateUserById,
    deleteUserById,
};
