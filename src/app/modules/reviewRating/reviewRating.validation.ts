import { role } from "@prisma/client";
import { z } from "zod";

const create = z.object({
  body: z.object({
    review: z.string({
      required_error: "Review is required",
    }),
    rating: z.number({
      required_error: "Rating is required",
    }),
    userId: z.string({
      required_error: "User Id is required",
    }),
    bookId: z.string({
      required_error: "Boo Id is required",
    }),
  }),
});

const update = z.object({
  body: z.object({
    review: z.string().optional(),
    rating: z.number().optional(),
    userId: z.string().optional(),
    bookId: z.string().optional(),
  }),
});

export const ReviewRatingValidation = { create, update };
