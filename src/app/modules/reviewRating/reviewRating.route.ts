import express from "express";
import { ReviewRatingService } from "./reviewRating.service";
import { ReviewRatingController } from "./reviewRating.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewRatingValidation } from "./reviewRating.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(ReviewRatingValidation.create),
  ReviewRatingController.insertIntoDB
);
router.get("/", ReviewRatingController.getAllData);
router.get("/:id", ReviewRatingController.getDataById);
router.patch(
  "/:id",
  validateRequest(ReviewRatingValidation.update),
  ReviewRatingController.updateIntoDB
);
router.delete("/:id", ReviewRatingController.deleteFromData);

export const reviewRatingRouter = router;
