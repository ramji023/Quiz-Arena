import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/customError"; // import custom ApiError class

// write function to handle Global errors
export default function errorMiddleware(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("error is : ", error); // log the error

  // check if throwing error is instance of ApiError (caught error) and if not then assign 500 status code
  const statusCode = error instanceof ApiError ? error.statusCode : 500;

  // check if throwing error is not instance of ApiError then assign custom message "Something went wrong"
  const message =
    error instanceof ApiError ? error.message : "Something went wrong";

  // send error response to the client
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
}
