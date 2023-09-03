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
    message: "Book get successfully",
    data: result,
  });
});

export const bookController = {
  postBook,
  getBook,
};
