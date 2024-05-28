import { role } from "@prisma/client";

export type ICategory = {
  searchTerm?: string | undefined;
  title?: string | undefined;
};

export type ICategoryFilterRequest = {
  searchTerm?: string;
  title?: string;
};
