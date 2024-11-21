import { Request, Response } from "express";
import config from "../../config";
import { JwtPayload, Secret, sign, verify } from "jsonwebtoken";
import { prisma } from "../../app";
import bcrypt from "bcrypt";

const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials!",
      });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const secret = config.jwt_secret_key as Secret;
    const token = sign(payload, secret, { expiresIn: "24h" });
    req.headers.authorization = token;

    return res.status(200).send({
      success: true,
      message: "Sign in user successfully",
      data: { token },
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
    const { email, password } = req.body;
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { ...req.body, password: hashedPassword },
    });

    return res.status(200).send({
      success: true,
      message: "Sign up user successfully",
      data: { user },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No Bearer token provided.",
      });
    }

    const token = authHeader.split(" ")[1];
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = verify(token, secret) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "User get successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
}

const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No Bearer token provided.",
      });
    }

    const token = authHeader.split(" ")[1];
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = verify(token, secret) as JwtPayload;
    const user = await prisma.user.update({
      where: { id: decodedToken.id },
      data,
    });
    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
}

const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No Bearer token provided.",
      });
    }

    const token = authHeader.split(" ")[1];
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = verify(token, secret) as JwtPayload;
    const user = await prisma.user.delete({
      where: { id: decodedToken.id },
    });
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
      data: user,
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
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
