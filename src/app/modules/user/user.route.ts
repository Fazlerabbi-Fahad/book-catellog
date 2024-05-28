import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/",
  // validateRequest(UserValidation.create),
  // auth(ENUM_USER_ROLE.ADMIN),
  UserController.insertIntoDB
);
router.get(
  "/",
  // auth(ENUM_USER_ROLE.ADMIN),
  UserController.getAllData
);
router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.getDataById);
router.patch(
  "/:id",
  validateRequest(UserValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateIntoDB
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteFromData
);

export const userRouter = router;
