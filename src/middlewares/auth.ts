import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const token = req.cookies.token;
      const token = req.headers.authorization;

      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Ypu are not authorized" });
      }

      let verified = null;

      verified = jwt.verify(
        token,
        config.jwt_secret_key as Secret
      ) as JwtPayload;

      req.body = verified;

      if (requiredRoles.length && !requiredRoles.includes(verified.role)) {
        return res
          .status(401)
          .json({ success: false, message: "Forbidden user" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
