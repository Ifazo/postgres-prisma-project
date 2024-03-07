import { Request, Response } from "express";
import config from "../../config";
import { JwtPayload, Secret, sign, verify } from "jsonwebtoken";
import { prisma } from "../../app";

const signInUser = async (req: Request, res: Response) => {
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
    const token = sign(payload, secret);
    req.headers.authorization = token;
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).send({
      success: true,
      message: "Sign in user successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const signUpUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }
    const user = await prisma.user.create({
      data: req.body,
    });
    return res.status(200).send({
      success: true,
      message: "Sign up user successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
}

const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = verify(token, secret) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
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
    const newToken = sign(payload, secret);
    req.headers.authorization = newToken;
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).send({
      success: true,
      message: "Refresh token successfully",
      token: newToken,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
}

export const authController = {
  signInUser,
  signUpUser,
  refreshToken,
};
