import { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../../helpers/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: any;
}

const auth =
  (...requiredRoles: string[]) =>
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("You are not authorized");
      }

      let verifiedUser = null;

      verifiedUser = jwtHelper.verifiedToken(
        token,
        config.jwt.secret as Secret
      );

      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new Error("Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
