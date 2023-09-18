import { Book, Prisma, PrismaClient } from "@prisma/client";
import { paginationHelpers } from "../../helpers/paginationHelpers";
import {
  IBookFilterRequest,
  IGenericResponse,
  IPaginationOptions,
} from "../../interface";

const prisma = new PrismaClient();

const postBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};

const getBook = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log(filterData);
  const andConditions = [];
  const bookSearchableFields: string[] = [ "title", "author", "genre" ];
  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
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
  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { title: "asc" },
  });
  const total = await prisma.book.count();
  const totalPage = Math.ceil(total / size);
  
  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const getBookByCategoryId = async (categoryId: string): Promise<Book[] | null> => {
  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
  });
  return result;
};

const getBookById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateBookById = async (id: string, data: any): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: { id },
    data,
  });
  return result;
};

const deleteBookById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const bookService = {
  postBook,
  getBook,
  getBookByCategoryId,
  getBookById,
  updateBookById,
  deleteBookById,
};
