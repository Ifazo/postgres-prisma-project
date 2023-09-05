export type IGenericResponse<T> = {
  meta: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  data: T;
};

export type IPaginationOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type IBookFilterRequest = {
  searchTerm?: string;
};
