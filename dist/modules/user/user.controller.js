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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findMany();
    return res.send({
        success: true,
        statusCode: 200,
        message: "Users get successfully",
        data: result,
    });
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield prisma.user.findUnique({
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
});
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield prisma.user.update({
        where: { id },
        data,
    });
    return res.send({
        success: true,
        statusCode: 200,
        message: "User updated successfully",
        data: result,
    });
});
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield prisma.user.delete({
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
});
exports.userController = {
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
