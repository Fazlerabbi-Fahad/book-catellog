import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelper } from "../../../helpers/jwtHelper";
import prisma from "../../../shared/prisma";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email } = payload;

  const isUserExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  //check user exist
  if (!isUserExist) {
    throw new Error("User does not exist");
  }

  //create jwt
  const { email: userId, role } = isUserExist;
  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return { accessToken, refreshToken };
};

export const AuthService = { loginUser };
