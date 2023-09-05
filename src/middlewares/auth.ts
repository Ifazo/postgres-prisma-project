import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../helpers/jwtHelpers";
import config from "../config";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      
      if (!token) {
        res.status(401).json({ success: false, message: "Ypu are not authorized" });
      }

      let verified = null;

      verified = jwtHelpers.verifyToken(
        token!,
        config.jwt_secret_key as Secret
      );

      req.body = verified;

      if (requiredRoles.length && !requiredRoles.includes(verified.role)) {
        res.status(401).json({ success: false, message: "Forbidden user" });
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
