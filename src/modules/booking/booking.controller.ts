import { Booking, Role } from "@prisma/client";
import { Request, Response } from "express";
import config from "../../config";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { prisma } from "../../app";

const createBooking = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const token = req.headers.authorization as string;
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const { email } = decodedToken;
    data.user = email;
    const result = await prisma.booking.create({
      data,
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    if (!token) {
      return res.send({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
      });
    }
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const { email, role } = decodedToken;
    if (role === "admin") {
      const result = await prisma.booking.findMany();
      return res.send({
        success: true,
        statusCode: 200,
        message: "Bookings get successfully",
        data: result,
      });
    }
    const result = await prisma.booking.findMany({
      where: {
        user: email,
      },
    });
    return res.send({
      success: true,
      statusCode: 200,
      message: "Bookings get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization as string;
    if (!token) {
      return res.send({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
      });
    }
    const booking = await prisma.booking.findUnique({
      where: {
        id,
      },
    });
    const { userId } = booking as Booking;
    const user = prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const secret = config.jwt_secret_key as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const { email, role } = decodedToken;

    if (role === Role.admin || email === user) {
      const result = await prisma.booking.findUnique({
        where: {
          id,
        },
      });
      return res.send({
        success: true,
        statusCode: 200,
        message: "Booking get successfully",
        data: result,
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "Invalid request",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization as string;
    if (!token) {
      return res.send({
        success: false,
        statusCode: 401,
        message: "Unauthorized",
      });
    }
    const booking = await prisma.booking.findUnique({
      where: {
        id,
      },
    });
    const { userId } = booking as Booking;
    const user = prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const secret = config.jwt_secret_key as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const { email, role } = decodedToken;
    if (role === Role.admin) {
      const result = await prisma.booking.delete({
        where: {
          id,
        },
      });
      return res.send({
        success: true,
        statusCode: 200,
        message: "Booking deleted successfully",
        data: result,
      });
    } else if (user === email) {
      const result = await prisma.booking.delete({
        where: {
          id,
        },
      });
      return res.send({
        success: true,
        statusCode: 200,
        message: "Booking deleted successfully",
        data: result,
      });
    }
    return res.send({
      success: true,
      statusCode: 200,
      message: "Invalid Booking Id",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

export const bookingController = {
  createBooking,
  getBookings,
  getBooking,
  deleteBooking,
};
