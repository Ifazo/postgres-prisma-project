type IOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
  minPrice?: number;
  maxPrice?: number;
};

type IOptionsResult = {
  page: number;
  size: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
  minPrice: number;
  maxPrice: number;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const size = Number(options.size || 5);
  const skip = (page - 1) * size;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "asc";
  const minPrice = Number(options.minPrice || 200);
  const maxPrice = Number(options.maxPrice || 400);

  return {
    page,
    size,
    skip,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
