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
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const app_1 = require("../../app");
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield app_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not found!",
            });
        }
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        const secret = config_1.default.jwt_secret_key;
        const token = (0, jsonwebtoken_1.sign)(payload, secret);
        req.headers.authorization = token;
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        return res.status(200).send({
            success: true,
            message: "Sign in user successfully",
            token: token,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
});
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            message: "Sign up user successfully",
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
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const secret = config_1.default.jwt_secret_key;
        const decodedToken = (0, jsonwebtoken_1.verify)(token, secret);
        const user = yield app_1.prisma.user.findUnique({
            where: { id: decodedToken.id },
        });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not found!",
            });
        }
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        const newToken = (0, jsonwebtoken_1.sign)(payload, secret);
        req.headers.authorization = newToken;
        res.cookie("token", newToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        return res.status(200).send({
            success: true,
            message: "Refresh token successfully",
            token: newToken,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
        });
    }
});
exports.authController = {
    signInUser,
    signUpUser,
    refreshToken,
};
