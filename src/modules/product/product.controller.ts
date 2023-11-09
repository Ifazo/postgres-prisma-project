import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { IBookFilterRequest, IPaginationOptions } from "../../interface";
import pick from "../../shared/pick";

const prisma = new PrismaClient();

// const bookOptionsFields: string[] = ["page", "size", "sortBy", "sortOrder", "minPrice", "maxPrice"];
// const bookFilterableFields: string[] = ["search", "title", "author", "genre"];

const postProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: req.body,
  });
  return res.status(200).send({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  return res.status(200).send({
    success: true,
    message: "Products get successfully",
    data: products,
  });

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
};

const getProductByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  const products = await prisma.product.findMany({
    where: {
      category,
    },
  });

  return res.status(200).send({
    success: true,
    message: "Product with associated category data fetched successfully",
    data: products,
  });
};

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return res.status(200).send({
    success: true,
    message: "Product get successfully",
    data: product,
  });
};

const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await prisma.product.update({
    where: { id },
    data,
  });

  return res.status(200).send({
    success: true,
    message: "Product updated successfully",
    data: result,
  });
};

const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.product.delete({
    where: {
      id,
    },
  });

  return res.status(200).send({
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
};

export const productController = {
  postProduct,
  getProducts,
  getProductById,
  getProductByCategory,
  updateProductById,
  deleteProductById,
};
