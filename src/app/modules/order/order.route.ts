import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post(
  "/",
  // auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.insertIntoDB
);
router.get(
  "/", // auth(ENUM_USER_ROLE.ADMIN),
  OrderController.getAllData
);
router.get(
  "/:id", // auth(ENUM_USER_ROLE.ADMIN),
  OrderController.getDataById
);
router.patch(
  "/:id",
  // auth(ENUM_USER_ROLE.ADMIN),
  OrderController.updateIntoDB
);
router.delete(
  "/:id",
  // auth(ENUM_USER_ROLE.ADMIN),
  OrderController.deleteFromData
);

export const orderRouter = router;
