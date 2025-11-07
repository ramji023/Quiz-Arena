import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utils/customError";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log("header of the client request", req.header);
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("token : ", token);
  if (!token) {
    throw new ApiError("User is not authorised", 401);
  }
  try {
    const verifiedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY as string
    ) as jwt.JwtPayload;
    console.log("decoded token data : ", verifiedToken);
    req.user = verifiedToken.id;
    next();
  } catch (err) {
    throw new ApiError("Something went wrong while verifying user token", 401);
  }
}
