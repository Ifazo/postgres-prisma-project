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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../../app");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const token = jsonwebtoken_1.default.sign(payload, secret);
        req.headers.authorization = token;
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        return res.status(200).send({
            success: true,
            message: "User sign-in successfully",
            token: token,
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
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const secret = config_1.default.jwt_secret_key;
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        const { id } = decodedToken;
        const user = yield app_1.prisma.user.findUnique({
            where: { id },
        });
        return res.status(200).send({
            success: true,
            message: "User profile fetched successfully",
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
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const secret = config_1.default.jwt_secret_key;
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        const { id } = decodedToken;
        const user = yield app_1.prisma.user.update({
            where: { id },
            data: req.body,
        });
        return res.status(200).send({
            success: true,
            message: "User profile updated successfully",
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
exports.authController = {
    loginUser,
    getProfile,
    updateProfile,
};
