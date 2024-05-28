import { role } from "@prisma/client";

export type IUser = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  role: role;
  contactNo: string | undefined;
  address: string | undefined;
};

export type IUserFilterRequest = {
  searchTerm?: string;
  name?: string;
  email?: string;
  role?: string;
  contactNo?: string;
  address?: string;
};
