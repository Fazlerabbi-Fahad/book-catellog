import express from "express";
import { CategoryController } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryValidation } from "./category.validate";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums";

const router = express.Router();

router.post(
  "/",
  validateRequest(CategoryValidation.create),
  // auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.insertIntoDB
);
router.get("/", CategoryController.getAllData);
router.get("/:id", CategoryController.getDataById);
router.patch(
  "/:id",
  validateRequest(CategoryValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateIntoDB
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteFromData
);

export const categoryRouter = router;
