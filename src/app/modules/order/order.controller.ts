import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrderService } from "./order.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { orderBook, ...order } = req.body;
  const result = await OrderService.insertIntoDB(orderBook, order);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order completed successfully!",
    data: result,
  });
});

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order fetched successfully!",
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getDataById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order fetched successfully!",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await OrderService.updateIntoDB(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order updated successfully!",
    data: result,
  });
});

const deleteFromData = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.deleteFromData(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order deleted successfully!",
    data: result,
  });
});

export const OrderController = {
  insertIntoDB,
  getAllData,
  getDataById,
  updateIntoDB,
  deleteFromData,
};
