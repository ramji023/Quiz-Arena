import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("header of the client request", req.header);
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("token : ", token);
  if (!token) {
    // throw error
    return;
  }
  try {
    const verifiedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY as string
    ) as jwt.JwtPayload;
    console.log("decoded token data : ", verifiedToken);
    req.userId = verifiedToken.id;
    next();
  } catch (err) {}
}
