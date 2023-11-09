import { Booking } from "@prisma/client";
import { Request, Response } from "express";
import config from "../../config";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { prisma } from "../../app";

const createBooking = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { startDate, endDate } = data;
    const bookingExists = await prisma.booking.findFirst({
      where: {
        startDate: {
          lte: new Date(endDate),
        },
        endDate: {
          gte: new Date(startDate),
        },
      },
    });
    if (bookingExists) {
      return res.status(400).send({
        success: false,
        message: "Booking already exists",
      });
    }
    const token = req.headers.authorization as string;
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const { email } = decodedToken;
    const result = await prisma.booking.create({
      data: {
        ...data,
        user: email,
      },
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
      message: "Internal server error",
      error,
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
    const { id, role } = decodedToken;
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
        user: id,
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
      message: "Internal server error",
      error,
    });
  }
};

const getBooking = async (req: Request, res: Response) => {
  try {
    const { id: bookingId } = req.params;
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
        id: bookingId,
      },
    });
    const { user } = booking as Booking;
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const { email, role } = decodedToken;
    if (role === "admin" || email === user) {
      const result = await prisma.booking.findUnique({
        where: {
          id: bookingId,
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
      message: "Internal server error",
      error,
    });
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id: bookingId } = req.params;
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
        id: bookingId,
      },
    });
    const { user } = booking as Booking;
    const secret = config.jwt_secret_key as Secret;
    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    const { id, role } = decodedToken;
    if (role === "admin") {
      const result = await prisma.booking.delete({
        where: {
          id: bookingId,
        },
      });
      return res.send({
        success: true,
        statusCode: 200,
        message: "Booking deleted successfully",
        data: result,
      });
    } else if (user === id) {
      const result = await prisma.booking.delete({
        where: {
          id: bookingId,
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
      message: "Internal server error",
      error,
    });
  }
};

export const bookingController = {
  createBooking,
  getBookings,
  getBooking,
  deleteBooking,
};
