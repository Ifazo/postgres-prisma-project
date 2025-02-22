import { Response } from "express";

const sendResponse = (res: Response, statusCode: number, success: boolean, message: any, data?: any) => {
    return res.status(statusCode).send({
        success,
        statusCode,
        message,
        data,
    });
};

export default sendResponse;