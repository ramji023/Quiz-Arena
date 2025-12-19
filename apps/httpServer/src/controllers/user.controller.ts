import { Request, Response } from "express"; // import Request and Response type
import jwt from "jsonwebtoken";
import { authUserValidation } from "../validations/user.validation"; // import userValidation object to verify client login,signup json data
import { cleanString } from "../utils/helperFun"; // import helper function to clean a given string
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../models/user.model"; // import models to perform database related tasks
import generateToken from "../utils/tokenGenerator"; // import function to generate tokens
import ApiError from "../utils/customError"; // import class to throw custom error

// controller to handle signup operation
export async function signup(req: Request, res: Response) {
  const { email, password } = req.body; // get the email and password from client request
  const cleanEmail = cleanString(email); // clean email whitespaces
  const cleanPassword = cleanString(password); // clean password whitespaces

  // call the safeParse() function to verify client json data satisfy zod userValidation object
  const parsedBodyObject = authUserValidation.safeParse({
    email: cleanEmail,
    password: cleanPassword,
  });

  // throw validation error if zod verification failed
  if (!parsedBodyObject.success) {
    throw new ApiError(
      parsedBodyObject.error.issues[0]?.message ?? "Validation error",
      404
    );
  }
  // if zod verification is passed
  //first check if user is already signed up or not
  const existedUser = await findUserByEmail(parsedBodyObject.data.email);
  // if user already signed up then throw custom error ("User is already registered")
  if (existedUser) {
    throw new ApiError("User is already registered", 404);
  }
  // if user is not signed up then create new user in database (call createUser model)
  const user = await createUser({
    ...parsedBodyObject.data,
    username: parsedBodyObject.data.email.split("@")[0]!, // pass default username by split the email
  });

  // if user is not returned from createUser model then throw custom error
  if (!user) {
    throw new ApiError("Something went wrong while registering", 404);
  }

  //  if user is successfully created then return success message to client
  return res.json({ msg: "user has successfully created account." });
}

// controller to handle login operation
export async function login(req: Request, res: Response) {
  const { email, password } = req.body; // get the email and password from client request
  const cleanEmail = cleanString(email); // clean email whitespaces
  const cleanPassword = cleanString(password); // clean password whitespaces

  // call the safeParse() function to verify client json data satisfy zod userValidation object
  const parsedBodyObject = authUserValidation.safeParse({
    email: cleanEmail,
    password: cleanPassword,
  });
  // throw validation error if zod verification failed
  if (!parsedBodyObject.success) {
    throw new ApiError(
      parsedBodyObject.error.issues[0]?.message ?? "Validation error",
      404
    );
  }
  // if zod verification is passed
  //first check if user is already signed up or not
  const user = await findUserByEmail(cleanEmail);

  // if user is not signed up then throw custom error ("User is not registered")
  if (!user) {
    throw new ApiError("User is not registered", 404);
  }
  // console.log("existed user : ", user); // log existed user details
  // if user is already signed up then check for password match
  if (user.password !== cleanPassword) {
    throw new ApiError("Password is incorrect", 404);
  }
  // if password is matched then generate access and refresh tokens (call generatToken function)
  const { accessToken, refreshToken } = generateToken({
    id: user.id,
    email: user.email,
  })!;
  // console.log("access token : ", accessToken); // log access token
  // console.log("refresh token : ", refreshToken); // log refresh token
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true,sameSite:'none' }); // set refresh token in httpOnly cookie
  // return success message along with access token to client
  return res.json({
    token: accessToken,
    id: user.id,
    userName: user.username,
    msg: "user has successfully logged into account.",
  });
}

// export async function updateUsername(req: any, res: Response) {
//   const userId = req.userId;
//   const name = cleanString(req.body.username);
//   const parsedBodyObject = userNameValidation.safeParse(name);
//   if (!parsedBodyObject.success) {
//     //throw error
//     return;
//   }

//   const user = await findAndUpdateUserbyId({ id: userId, username: name });
//   if (!user) {
//     // throw error
//     return;
//   }

//   return res.json({ msg: "User has updated his profile successfully" });
// }

// controller to handle token refresh operation
export async function refreshedToken(req: Request, res: Response) {
  // console.log("cookies : ", req.cookies); // log all the cookies from client request
  const oldRefreshToken = req.cookies.refreshToken;
  // console.log("old refresh token : ", oldRefreshToken); // log old refresh token
  // if old refresh token is not present in cookie then thow custom error
  if (!oldRefreshToken) {
    throw new ApiError("Refresh token is missing", 404);
  }
  // if old refresh token is present in cookie then verify it using jwt.verify() function
  const decodedToken = jwt.verify(
    oldRefreshToken,
    process.env.REFRESH_TOKEN_KEY as string
  ) as jwt.JwtPayload;
  // console.log("decoded token : ",decodedToken);//log the decoded token data
  // if decoded token is valid then get the user data from database (using findUserById model)
  const userData = await findUserById(decodedToken.id);
  // if userData is not found then throw custom error
  if (!userData) {
    throw new ApiError("User don't have valid refresh token", 404);
  }
  // console.log("user data : ", userData);  // log the user data
  // if user data is found then generate new access and refresh tokens
  const { refreshToken, accessToken } = generateToken({
    id: userData.id,
    email: userData.email,
  })!;
  // console.log("access token : ", accessToken); // log access token
  // console.log("refresh token : ", refreshToken); // log refresh token
  // if both tokens are generated successfully then set the refresh token in secure cookie and return access token to the clinet
  if (refreshToken && accessToken) {
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true,sameSite:'none' });
    return res.json({
      token: accessToken,
      id: userData.id,
      userName: userData.username,
      msg: "token is refreshed successfully",
    });
  }
}

// controller to handle logout operation
export function logOut(req: Request, res: Response) {
  const userId = req.user; // get the user id from authentication middleware if user is authenticated
  // if user is authenticated then clear the cookies of that user
  res.clearCookie("refreshToken");
  // and return success message to client
  return res.json({ msg: "User has logged out successfully" });
}
