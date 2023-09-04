import { Book } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { bookService } from "./book.service";
import { Request, Response } from "express";

const postBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.postBook(req.body);
  sendResponse<Book>(res, {
    success: true,
    statusCode: 200,
    message: "Book created successfully",
    data: result,
  });
});

const getBook = catchAsync(async (_req: Request, res: Response) => {
  const result = await bookService.getBook();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Books get successfully",
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
  getBookById,
  updateBookById,
  deleteBookById,
};
