import { role } from "@prisma/client";

export type IReviewRating = {
  searchTerm?: string | undefined;
  review: string | undefined;
  rating: number | undefined;
  userId: string | undefined;
  bookId: string | undefined;
};

export type IReviewRatingFilterRequest = {
  searchTerm?: string;
  review?: string | undefined;
  rating?: number | undefined;
  userId?: string | undefined;
  bookId?: string | undefined;
};
