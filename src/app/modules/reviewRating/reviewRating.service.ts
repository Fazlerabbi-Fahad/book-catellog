import { Book, Prisma, ReviewRating, User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { reviewRatingSearchableFields } from "./reviewRating.constant";
import { IReviewRatingFilterRequest } from "./reviewRating.interface";
import { validateRating } from "./reviewRating.utils";

const insertIntoDB = async (data: ReviewRating): Promise<ReviewRating> => {
  validateRating(data.rating);
  const reviewIsAlreadyGivenByThisUser = await prisma.reviewRating.findFirst({
    where: {
      AND: [{ userId: data.userId }, { bookId: data.bookId }],
    },
  });

  if (reviewIsAlreadyGivenByThisUser) {
    throw new Error("Review is already given by this user");
  }
  const result = await prisma.reviewRating.create({
    data,
    include: {
      user: true,
      book: true,
    },
  });

  return result;
};

const getAllData = async (
  filters: IReviewRatingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<ReviewRating[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: reviewRatingSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereCondition: Prisma.ReviewRatingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.reviewRating.findMany({
    where: whereCondition,
    include: {
      user: true,
      book: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.reviewRating.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string) => {
  const result = await prisma.reviewRating.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      book: true,
    },
  });

  return result;
};

const updateIntoDB = async (id: string, payload: Partial<ReviewRating>) => {
  const result = await prisma.reviewRating.update({
    where: {
      id,
    },
    data: payload,
    include: {
      user: true,
      book: true,
    },
  });

  return result;
};

const deleteFromData = async (id: string) => {
  const result = await prisma.reviewRating.delete({
    where: {
      id,
    },
    include: {
      user: true,
      book: true,
    },
  });

  return result;
};

export const ReviewRatingService = {
  insertIntoDB,
  getAllData,
  getDataById,
  updateIntoDB,
  deleteFromData,
};
