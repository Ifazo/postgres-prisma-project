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
exports.authController = void 0;
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const userExists = yield prisma.user.findUnique({
        where: { email },
    });
    if (userExists) {
        return res.status(400).send({
            success: false,
            statusCode: 400,
            message: "User already exists",
        });
    }
    const user = yield prisma.user.create({
        data: req.body,
    });
    return res.status(200).send({
        success: true,
        statusCode: 200,
        message: "User created successfully",
        data: user,
    });
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        return res.status(400).send({
            success: false,
            statusCode: 400,
            message: "User not found!",
        });
    }
    const payload = {
        id: user.id,
        role: user.role,
    };
    const secret = config_1.default.jwt_secret_key;
    const token = jsonwebtoken_1.default.sign(payload, secret);
    req.headers.authorization = token;
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    return res.status(200).send({
        success: true,
        statusCode: 200,
        message: "User sign-in successfully",
        token: token,
    });
});
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const secret = config_1.default.jwt_secret_key;
    const decodedToken = jsonwebtoken_1.default.verify(token, secret);
    const { id } = decodedToken;
    const user = yield prisma.user.findUnique({
        where: { id },
    });
    return res.status(200).send({
        success: true,
        statusCode: 200,
        message: "User profile",
        data: user,
    });
});
exports.authController = {
    createUser,
    loginUser,
    profile,
};
