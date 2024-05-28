import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { ReviewRatingService } from "./reviewRating.service";
import { reviewRatingFilterAbleField } from "./reviewRating.constant";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewRatingService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review rating created successfully!",
    data: result,
  });
});

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, reviewRatingFilterAbleField);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ReviewRatingService.getAllData(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review rating fetched successfully!",
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewRatingService.getDataById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review rating fetched successfully!",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ReviewRatingService.updateIntoDB(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review rating updated successfully!",
    data: result,
  });
});

const deleteFromData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewRatingService.deleteFromData(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review rating deleted successfully!",
    data: result,
  });
});

export const ReviewRatingController = {
  insertIntoDB,
  getAllData,
  getDataById,
  updateIntoDB,
  deleteFromData,
};
