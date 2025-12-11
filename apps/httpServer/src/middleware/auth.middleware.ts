import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"; // import jwt from jsonwebtoken
import ApiError from "../utils/customError"; // import custom application handler

// middleware function to verify the access token and move to next middleware using next()
export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log("header of the client request", req.header);  // log client request header

  const token = req.header("Authorization")?.replace("Bearer ", ""); // extract the jwt token and remove Bearer using replace() method
  // console.log("token : ", token);   // log client token

  // if token not exist throw the error
  if (!token) {
    throw new ApiError("User is not authorised", 401);
  }
  try {
    //verify the token using jwt.verify()
    const verifiedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY as string
    ) as jwt.JwtPayload;
    // console.log("decoded token data : ", verifiedToken);   // log the decoded token data

    req.user = verifiedToken.id; // attach user id to req.user so upcoming middlewares can access that client data

    next(); // move to the next middleware or route
  } catch (err) {
    // if somehow jwt.verify() failed , throw the error
    throw new ApiError("Something went wrong while verifying user token", 401);
  }
}
