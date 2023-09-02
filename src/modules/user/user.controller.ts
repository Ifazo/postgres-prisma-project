import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import { User } from "@prisma/client";

const postUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserService.postUser(req.body)
        sendResponse<User>(res, {
          success: true,
          statusCode: 200,
          message: "User created successfully",
          data: result,
        });
    } catch (error) {
        next(error)
    }
}

export const UserController = {
    postUser
}