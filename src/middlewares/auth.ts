import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";

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
      const token = req.headers.authorization;

      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "You are unauthorized" });
      }

      const verifiedUser = jwt.verify(
        token,
        config.jwt_secret_key as Secret
      ) as JwtPayload;

      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        return res
          .status(401)
          .json({ success: false, message: "Forbidden user" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  };

export default auth;
