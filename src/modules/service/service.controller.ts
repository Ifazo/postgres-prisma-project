import { Request, Response } from "express";
import { prisma } from "../../app";

// const bookOptionsFields: string[] = ["page", "size", "sortBy", "sortOrder", "minPrice", "maxPrice"];
// const bookFilterableFields: string[] = ["search", "title", "author", "genre"];

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
      message: "Internal server error",
      error,
    });
  }
};

const getServices = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    if (startDate && endDate) {
      const result = await prisma.service.findMany({
        where: {
          startDate: {
            gte: new Date(startDate as string),
          },
          endDate: {
            lte: new Date(endDate as string),
          },
        },
      });
      return res.status(200).send({
        success: true,
        message: "Services get successfully",
        data: result,
      });
    }
    const result = await prisma.service.findMany();
    return res.status(200).send({
      success: true,
      message: "Services get successfully",
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

// const filters = pick(req.query, bookFilterableFields) as IBookFilterRequest;
// const options = pick(req.query, bookOptionsFields) as IPaginationOptions;
// const { page, size, skip, sortBy, sortOrder, minPrice, maxPrice } =
//   paginationHelpers.calculatePagination(options);
// const { search, ...filterData } = filters;

// const andConditions = [];
// const bookSearchableFields: string[] = [ "title", "author", "genre" ];

// if (search) {
//   andConditions.push({
//     OR: bookSearchableFields.map((field) => ({
//       [field]: {
//         contains: search,
//         mode: "insensitive",
//       },
//     })),
//   });
// }

// if (Object.keys(filterData).length > 0) {
//   andConditions.push({
//     AND: Object.keys(filterData).map((key) => ({
//       [key]: {
//         equals: (filterData as any)[key],
//       },
//     })),
//   });
// }

// const whereConditions: Prisma.ProductWhereInput =
//   andConditions.length > 0 ? { AND: andConditions } : {};

// const books = await prisma.product.findMany({
//   where: whereConditions,
//   skip,
//   take: size,
//   orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { name: "asc" },
// });

// const total = await prisma.product.count();
// const totalPage = Math.ceil(total / size);
// const meta = { page, size, total, totalPage };
// return res.send({
//   success: true,
//   statusCode: 200,
//   message: "Products by search & filters get successfully",
//   meta: meta,
//   data: books,
// });

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
      message: "Internal server error",
      error,
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
      message: "Internal server error",
      error,
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
      message: "Internal server error",
      error,
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
