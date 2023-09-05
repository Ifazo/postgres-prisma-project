import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../helpers/jwtHelpers";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      // verify token
      if (!token) {
        res.status(401).json({ success: false, message: "Invalid token" });
      }

      let verified = null;

      verified = jwtHelpers.verifyToken(
        token!,
        process.env.jwt_secret_key as Secret
      );

      req.body = verified;

      if (requiredRoles.length && !requiredRoles.includes(verified.role)) {
        res.status(401).json({ success: false, message: "Invalid user" });
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
