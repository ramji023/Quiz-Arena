import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  authUserValidation,
  userNameValidation,
} from "../validations/user.validation";
import { cleanString } from "../utils/helperFun";
import {
  createUser,
  findAndUpdateUserbyId,
  findUserByEmail,
  findUserById,
} from "../models/user.model";
import generateToken from "../utils/tokenGenerator";
import ApiError from "../utils/customError";

export async function signup(req: Request, res: Response) {
  const { email, password } = req.body;
  const cleanEmail = cleanString(email);
  const cleanPassword = cleanString(password);

  const parsedBodyObject = authUserValidation.safeParse({
    email: cleanEmail,
    password: cleanPassword,
  });
  if (!parsedBodyObject.success) {
    throw new ApiError(
      parsedBodyObject.error.issues[0]?.message ?? "Validation error",
      404
    );
  }

  //first check if user is already signed up or not
  const existedUser = await findUserByEmail(parsedBodyObject.data.email);

  if (existedUser) {
    throw new ApiError("User is already registered", 404);
  }
  const user = await createUser({
    ...parsedBodyObject.data,
    username: parsedBodyObject.data.email.split("@")[0]!,
  });

  if (!user) {
    throw new ApiError("Something went wrong while registering", 404);
  }

  return res.json({ msg: "user has successfully created account." });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const cleanEmail = cleanString(email);
  const cleanPassword = cleanString(password);

  const parsedBodyObject = authUserValidation.safeParse({
    email: cleanEmail,
    password: cleanPassword,
  });
  if (!parsedBodyObject.success) {
    throw new ApiError(
      parsedBodyObject.error.issues[0]?.message ?? "Validation error",
      404
    );
  }
  const user = await findUserByEmail(cleanEmail);

  if (!user) {
    throw new ApiError("User is not registered", 404);
  }
  // console.log("existed user : ", user);
  const { accessToken, refreshToken } = generateToken({
    id: user.id,
    email: user.email,
  })!;
  // console.log("access token : ", accessToken);
  // console.log("refresh token : ", refreshToken);
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
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

export async function refreshedToken(req: Request, res: Response) {
  // console.log("cookies : ", req.cookies);
  const oldRefreshToken = req.cookies.refreshToken;
  // console.log("old refresh token : ", oldRefreshToken);
  if (!oldRefreshToken) {
    throw new ApiError("Refresh token is missing", 404);
  }
  const decodedToken = jwt.verify(
    oldRefreshToken,
    process.env.REFRESH_TOKEN_KEY as string
  ) as jwt.JwtPayload;
  const userData = await findUserById(decodedToken.id);
  if (!userData) {
    throw new ApiError("User don't have valid refresh token", 404);
  }
  // console.log("user data : ", userData);
  const { refreshToken, accessToken } = generateToken({
    id: userData.id,
    email: userData.email,
  })!;
  // console.log("access token : ", accessToken);
  // console.log("refresh token : ", refreshToken);
  if (refreshToken && accessToken) {
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    return res.json({
      token: accessToken,
      id: userData.id,
      userName: userData.username,
      msg: "token is refreshed successfully",
    });
  }
}

export function logOut(req: Request, res: Response) {
  const userId = req.user;
  res.clearCookie("refreshToken");
  return res.json({ msg: "User has logged out successfully" });
}
