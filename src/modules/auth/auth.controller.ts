import { Request, Response } from "express";
import { JwtPayload, Secret, sign, verify } from "jsonwebtoken";
import { prisma } from "../../app";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import userSchema from "../../schema/user.schema";
import sendResponse from "../../middlewares/sendResponse";

dotenv.config();

const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return sendResponse(res, 401, false, "Invalid credentials!");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, 401, false, "Invalid credentials!");
    }
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const secret = process.env.JWT_SECRET_KEY as Secret;
    const token = sign(payload, secret, { expiresIn: "24h" });
    req.headers.authorization = token;

    return sendResponse(res, 200, true, "Sign in successfully", { token });
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

const signUpUser = async (req: Request, res: Response) => {
  try {
    const validationResult = userSchema.safeParse(req.body);
    if (!validationResult.success) {
      return sendResponse(res, 400, false, validationResult.error.errors);
    }
    const { email, password } = validationResult.data;
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return sendResponse(res, 409, false, "User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.user.create({
      data: { ...validationResult.data, password: hashedPassword },
    });
    return sendResponse(res, 201, true, "User created successfully", result);
  } catch (error) {
    return sendResponse(res, 500, false, error);
  }
};

export const authController = {
  signInUser,
  signUpUser,
};
