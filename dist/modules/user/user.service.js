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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findMany();
    return {
        data: result,
    };
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id,
        },
    });
    return user;
});
const updateUserById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.update({
        where: { id },
        data,
    });
    return result;
});
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.delete({
        where: {
            id,
        },
    });
    return user;
});
exports.userService = {
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
