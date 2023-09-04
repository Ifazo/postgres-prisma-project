import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const postCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getCategory = async () => {
  const result = await prisma.category.findMany();
  return {
    data: result,
  };
};

const getCategoryById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const categoryService = {
  postCategory,
  getCategory,
  getCategoryById
};
