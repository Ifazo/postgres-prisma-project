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
exports.userController = void 0;
const app_1 = require("../../app");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const userExists = yield app_1.prisma.user.findUnique({
            where: { email },
        });
        if (userExists) {
            return res.status(400).send({
                success: false,
                message: "User already exists",
            });
        }
        const user = yield app_1.prisma.user.create({
            data: req.body,
        });
        return res.status(200).send({
            success: true,
            message: "User created successfully",
            data: user,
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
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield app_1.prisma.user.findMany({
            where: { role: "user" },
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
            message: "Internal server error",
            error,
        });
    }
});
const getAdmins = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield app_1.prisma.user.findMany({
            where: { role: "admin" },
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
            message: "Internal server error",
            error,
        });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.user.findUnique({
            where: {
                id,
            },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "User get successfully",
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
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = yield app_1.prisma.user.update({
            where: { id },
            data,
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "User updated successfully",
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
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.user.delete({
            where: {
                id,
            },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "User deleted successfully",
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
exports.userController = {
    createUser,
    getUsers,
    getAdmins,
    getUserById,
    updateUserById,
    deleteUserById,
};
