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
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const getUsers = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getUsers();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Users get successfully",
        data: result,
    });
}));
const getUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userService.getUserById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User get successfully",
        data: result,
    });
}));
const updateUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield user_service_1.userService.updateUserById(id, data);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User updated successfully",
        data: result,
    });
}));
const deleteUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userService.deleteUserById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User deleted successfully",
        data: result,
    });
}));
exports.userController = {
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
