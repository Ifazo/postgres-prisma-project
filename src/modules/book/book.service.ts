import { Book, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const postBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};

const getBook = async () => {
  const result = await prisma.book.findMany();
  return {
    data: result,
  };
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
  getBookById,
  updateBookById,
  deleteBookById,
};
