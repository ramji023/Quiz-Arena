import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/customError";
import { success } from "zod";

export default function errorMiddleware(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("error is : ", error);
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message =
    error instanceof ApiError ? error.message : "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    message: message,
  });
}
