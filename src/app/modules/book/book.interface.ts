import { role } from "@prisma/client";

export type IBook = {
  searchTerm?: string | undefined;
  title: string | undefined;
  author: string | undefined;
  price: number | undefined;
  genre: string | undefined;
  publicationDate: string | undefined;
  categoryId: string | undefined;
};

export type IBookFilterRequest = {
  searchTerm?: string;
  title?: string | undefined;
  author?: string | undefined;
  price?: number | undefined;
  genre?: string | undefined;
  publicationDate?: string | undefined;
  categoryId?: string | undefined;
};
