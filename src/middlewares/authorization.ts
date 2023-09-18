import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "You are unauthorized" });
    }

    const verifiedToken = jwt.verify(
      token,
      config.jwt_secret_key as Secret
      ) as JwtPayload;
      
      const { userId } = verifiedToken;

    if (verifiedToken.userId !== userId) {
      return res
        .status(401)
        .json({ success: false, message: "You are forbidden user" });
    }

    // req.headers = verifiedToken;

    next();
  } catch (error) {
    next(error);
  }
};

export default authorization;
