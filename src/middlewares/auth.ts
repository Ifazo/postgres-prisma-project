import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const token = req.cookies.token;
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "You are unauthorized" });
    }

    const decodedToken = jwt.verify(
      token,
      config.jwt_secret_key as Secret
    ) as JwtPayload;

    if (roles.length && !roles.includes(decodedToken.role)) {
      return res
        .status(401)
        .json({ success: false, message: "Forbidden user" });
    }

    req.body = decodedToken;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
