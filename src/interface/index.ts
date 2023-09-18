export type IGenericResponse<T> = {
  meta: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  data: T;
};

export type ILoginResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  token: string;
};

export type IAuth = {
  id: string;
  role: string;
};

export type IOrderedBook = {
  id: string;
  bookId: string;
  orderId: string;
  quantity: number;
}

export type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    contactNo: string;
    address: string;
    profileImg: string;
    createdAt: Date;
    updatedAt: Date;
  };
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
