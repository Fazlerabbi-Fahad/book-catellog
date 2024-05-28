import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { BookService } from "./book.service";
import { bookFilterAbleField } from "./book.constant";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created successfully!",
    data: result,
  });
});

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterAbleField);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await BookService.getAllData(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getDataById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book fetched successfully!",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await BookService.updateIntoDB(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully!",
    data: result,
  });
});

const deleteFromData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deleteFromData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully!",
    data: result,
  });
});

const getBooksWithAssociatedCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const filters = pick(req.query, bookFilterAbleField);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await BookService.getBooksWithAssociatedCategory(
      id,
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Books with associated category data fetched successfully!",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const BookController = {
  insertIntoDB,
  getAllData,
  getDataById,
  updateIntoDB,
  deleteFromData,
  getBooksWithAssociatedCategory,
};
