import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import sendResponse from "./sendResponse";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return sendResponse(res, 401, false, "Unauthorized");
      }
      const token = authHeader.split(" ")[1];
      const verifiedUser = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as Secret
      ) as JwtPayload;

      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        return sendResponse(res, 403, false, "Forbidden");
      }

      next();
    } catch (error) {
      return sendResponse(res, 500, false, error);
    }
  };

export default auth;
