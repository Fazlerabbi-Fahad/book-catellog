import express from "express";
import { BookController } from "./book.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BookValidation } from "./book.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums";

const router = express.Router();

router.post(
  "/",
  // validateRequest(BookValidation.create),
  // auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDB
);
router.get("/", BookController.getAllData);
router.get("/:id/category", BookController.getBooksWithAssociatedCategory);
router.get("/:id", BookController.getDataById);
router.patch(
  "/:id",
  validateRequest(BookValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.updateIntoDB
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteFromData
);

export const bookRouter = router;
