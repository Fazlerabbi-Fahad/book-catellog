import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();
router.post(
  "/sign-in",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
export const authRouter = router;
