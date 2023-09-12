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
exports.authService = exports.profile = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.create({
        data,
    });
    return result;
});
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = data;
    const result = yield prisma.user.findUnique({
        where: { email },
    });
    return result;
});
const profile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.user.findUnique({
            where: { id: userId },
        });
        return result;
    }
    catch (error) {
        console.error(error);
        throw new Error("An error occurred while processing the profile");
    }
});
exports.profile = profile;
exports.authService = {
    createUser,
    loginUser,
    profile,
};
