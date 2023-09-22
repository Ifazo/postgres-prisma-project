import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import { IBookFilterRequest, IPaginationOptions } from "../../interface";
import pick from "../../shared/pick";

const prisma = new PrismaClient();

const bookOptionsFields: string[] = ["page", "size", "sortBy", "sortOrder", "minPrice", "maxPrice"];
const bookFilterableFields: string[] = ["search", "title", "author", "genre"];

const postBook = async (req: Request, res: Response) => {
  const book = await prisma.book.create({
    data: req.body,
  });
  return res.send({
    success: true,
    statusCode: 200,
    message: "Book created successfully",
    data: book,
  });
};

const getBook = async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields) as IBookFilterRequest;
  const options = pick(req.query, bookOptionsFields) as IPaginationOptions;
  const { page, size, skip, sortBy, sortOrder, minPrice, maxPrice } =
    paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;

  const andConditions = [];
  const bookSearchableFields: string[] = ["title", "author", "genre"];
  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const books = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : { title: "asc" },
  });
  
  const total = await prisma.book.count();
  const totalPage = Math.ceil(total / size);
  const meta = { page, size, total, totalPage };
  return res.send({
    success: true,
    statusCode: 200,
    message: "Books by search & filters get successfully",
    meta: meta,
    data: books,
  });
};

const getBookByCategoryId = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const books = await prisma.book.findMany({
    where: {
      categoryId,
    },
  });

  return res.send({
    success: true,
    statusCode: 200,
    message: "Books with associated category data fetched successfully",
    data: books,
  });
};

const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return res.send({
    success: true,
    statusCode: 200,
    message: "Book get successfully",
    data: book,
  });
};

const updateBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await prisma.book.update({
    where: { id },
    data,
  });

  return res.send({
    success: true,
    statusCode: 200,
    message: "Book updated successfully",
    data: result,
  });
};

const deleteBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });

  return res.send({
    success: true,
    statusCode: 200,
    message: "Book deleted successfully",
    data: result,
  });
};

export const bookController = {
  postBook,
  getBook,
  getBookByCategoryId,
  getBookById,
  updateBookById,
  deleteBookById,
};
