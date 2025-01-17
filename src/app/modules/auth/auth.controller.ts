import { Request, Response } from "express";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  //Set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  // delete result.refreshToken

  if ("refreshToken" in result) {
    delete result.refreshToken;
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User signed in successfully!",
    data: others,
  });
});

export const AuthController = {
  loginUser,
};
