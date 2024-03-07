import { Request, Response } from "express";
import { prisma } from "../../app";

const createService = async (req: Request, res: Response) => {
  try {
    const result = await prisma.service.create({
      data: req.body,
    });
    return res.status(200).send({
      success: true,
      message: "Service created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getServices = async (req: Request, res: Response) => {
  try {
    const {
      search,
      startDate,
      endDate,
      upcoming,
      ongoing,
      ended,
      page,
      take,
    } = req.query;
    if (search) {
      const result = await prisma.service.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search as string,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search as string,
                mode: "insensitive",
              },
            },
          ],
        },
      });
      return res.status(200).send({
        success: true,
        message: "Services by search get successfully",
        data: result,
      });
    } else if (page && take) {
      const result = await prisma.service.findMany({
        skip: (Number(page) - 1) * Number(take) || 0,
        take: Number(take) || 10,
      });
      const total = await prisma.service.count();
      const totalPage = Math.ceil(total / Number(take));
      return res.status(200).send({
        success: true,
        message: "Services by pagination get successfully",
        total,
        totalPage,
        data: result,
      });
    } else if (startDate && endDate) {
      const result = await prisma.service.findMany({
        where: {
          startDate: {
            gte: new Date(),
          },
          endDate: {
            lte: new Date(),
          },
        },
      });
      return res.status(200).send({
        success: true,
        message: "Services by date get successfully",
        data: result,
      });
    } else if (upcoming) {
      const result = await prisma.service.findMany({
        where: {
          startDate: {
            gte: new Date(),
          },
        },
      });
      return res.status(200).send({
        success: true,
        message: "Upcoming services get successfully",
        data: result,
      });
    } else if (ongoing) {
      const result = await prisma.service.findMany({
        where: {
          startDate: {
            lte: new Date(),
          },
          endDate: {
            gte: new Date(),
          },
        },
      });
      return res.status(200).send({
        success: true,
        message: "Ongoing services get successfully",
        data: result,
      });
    } else if (ended) {
      const result = await prisma.service.findMany({
        where: {
          endDate: {
            lte: new Date(),
          },
        },
      });
      return res.status(200).send({
        success: true,
        message: "Ended services get successfully",
        data: result,
      });
    } else {
      const result = await prisma.service.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).send({
        success: true,
        message: "Services get successfully",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.service.findUnique({
      where: {
        id,
      },
    });
    return res.status(200).send({
      success: true,
      message: "Service get successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const updateServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await prisma.service.update({
      where: { id },
      data,
    });
    return res.status(200).send({
      success: true,
      message: "Service updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

const deleteServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await prisma.service.delete({
      where: {
        id,
      },
    });
    return res.status(200).send({
      success: true,
      message: "Service deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error,
    });
  }
};

export const serviceController = {
  createService,
  getServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
