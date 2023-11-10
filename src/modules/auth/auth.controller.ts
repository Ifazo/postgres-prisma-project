import { Request, Response } from "express";
import config from "../../config";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { prisma } from "../../app";

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found!",
      });
    }
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const secret = config.jwt_secret_key as Secret;
    const token = jwt.sign(payload, secret);
    req.headers.authorization = token;
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).send({
      success: true,
      message: "User sign-in successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
const getProfile = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const { id } = decodedToken;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return res.status(200).send({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const { id } = decodedToken;
    const user = await prisma.user.update({
      where: { id },
      data: req.body,
    });
    return res.status(200).send({
      success: true,
      message: "User profile updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const authController = {
  loginUser,
  getProfile,
  updateProfile,
};
