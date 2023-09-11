import { Book } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { bookService } from "./book.service";
import { Request, Response } from "express";
import pick from "../../shared/pick";

const postBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.postBook(req.body);
  sendResponse<Book>(res, {
    success: true,
    statusCode: 200,
    message: "Book created successfully",
    data: result,
  });
});

const bookOptionsFields: string[] = ["page", "size", "sortBy", "sortOrder"];
const bookFilterableFields: string[] = [
  "searchTerm",
  "title",
  "author",
  "genre",
];

const getBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, bookOptionsFields);

  const result = await bookService.getBook(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Books by search & filters get successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getBookByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await bookService.getBookByCategoryId(categoryId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Books with associated category data fetched successfully",
    data: result,
  });
});

const getBookById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookService.getBookById(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Book get successfully",
    data: result,
  });
});

const updateBookById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await bookService.updateBookById(id, data);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBookById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookService.deleteBookById(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Book deleted successfully",
    data: result,
  });
});

export const bookController = {
  postBook,
  getBook,
  getBookByCategoryId,
  getBookById,
  updateBookById,
  deleteBookById,
};
