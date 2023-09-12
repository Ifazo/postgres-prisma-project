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
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.createUser(req.body);
    const tokenPayload = {
        userId: result === null || result === void 0 ? void 0 : result.id,
        role: result === null || result === void 0 ? void 0 : result.role,
    };
    const secret = config_1.default.jwt_secret_key;
    const token = jsonwebtoken_1.default.sign(tokenPayload, secret, { expiresIn: "24h" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: config_1.default.node_env === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User created successfully",
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.loginUser(req.body);
    const tokenPayload = {
        userId: result === null || result === void 0 ? void 0 : result.id,
        role: result === null || result === void 0 ? void 0 : result.role,
    };
    const secret = config_1.default.jwt_secret_key;
    const token = jsonwebtoken_1.default.sign(tokenPayload, secret, { expiresIn: "24h" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: config_1.default.node_env === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User sign-in successfully",
        data: result,
    });
}));
const profile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.userId;
    console.log(userId);
    const result = yield auth_service_1.authService.profile(userId);
    console.log(result);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User profile",
        data: result,
    });
}));
exports.authController = {
    createUser,
    loginUser,
    profile,
};
