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
exports.reviewController = void 0;
const app_1 = require("../../app");
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const token = req.headers.authorization;
        const secret = config_1.default.jwt_secret_key;
        const decodedToken = jsonwebtoken_1.default.verify(token, secret);
        const { email, name, image } = decodedToken;
        data.user = email;
        data.name = name;
        data.image = image;
        const result = yield app_1.prisma.review.create({
            data,
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Review created successfully",
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
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.review.findMany({
            where: {
                productId: id,
            },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Review get successfully",
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
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = yield app_1.prisma.review.update({
            where: {
                id,
            },
            data,
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Review updated successfully",
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
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield app_1.prisma.review.delete({
            where: {
                id,
            },
        });
        return res.send({
            success: true,
            statusCode: 200,
            message: "Review deleted successfully",
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
exports.reviewController = {
    postReview,
    getReviews,
    updateReview,
    deleteReview,
};
