import express from "express";
import { userRouter } from "../modules/user/user.route";
import { categoryRouter } from "../modules/category/category.route";
import { bookRouter } from "../modules/book/book.route";
import { reviewRatingRouter } from "../modules/reviewRating/reviewRating.route";
import { authRouter } from "../modules/auth/auth.route";
import { orderRouter } from "../modules/order/order.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    routes: userRouter,
  },
  {
    path: "/category",
    routes: categoryRouter,
  },
  {
    path: "/book",
    routes: bookRouter,
  },
  {
    path: "/book",
    routes: bookRouter,
  },
  {
    path: "/review-rating",
    routes: reviewRatingRouter,
  },
  {
    path: "/auth",
    routes: authRouter,
  },
  {
    path: "/order",
    routes: orderRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
