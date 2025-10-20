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

export async function signup(req: Request, res: Response) {
  const { email, password } = req.body;
  const cleanEmail = cleanString(email);
  const cleanPassword = cleanString(password);

  const parsedBodyObject = authUserValidation.safeParse({
    email: cleanEmail,
    password: cleanPassword,
  });
  if (!parsedBodyObject.success) {
    //throw error
    return;
  }

  const user = await createUser(parsedBodyObject.data);

  if (!user) {
    // throw error
    return;
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
    //throw error
    return;
  }

  const user = await findUserByEmail(cleanEmail);

  if (!user) {
    // throw error
    return;
  }

  const { accessToken, refreshToken } = generateToken(user);

  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
  return res.json({
    token: accessToken,
    username: user.username,
    msg: "user has successfully logged into account.",
  });
}

export async function updateUsername(req: any, res: Response) {
  const userId = req.userId;
  const name = cleanString(req.body.username);
  const parsedBodyObject = userNameValidation.safeParse(name);
  if (!parsedBodyObject.success) {
    //throw error
    return;
  }

  const user = await findAndUpdateUserbyId({ id: userId, username: name });
  if (!user) {
    // throw error
    return;
  }

  return res.json({ msg: "User has updated his profile successfully" });
}

export async function refreshedToken(req: Request, res: Response) {
  const oldRefreshToken = req.cookies.refreshToken;
  const decodedToken = jwt.verify(
    oldRefreshToken,
    process.env.REFRESH_TOKEN_KEY as string
  ) as jwt.JwtPayload;
  const userData = await findUserById(decodedToken.id);
  if (!userData) {
    // throw error
    return;
  }
  const { refreshToken, accessToken } = generateToken(userData);

  if (refreshToken && accessToken) {
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    return res.json({
      token: accessToken,
      msg: "token is refreshed successfully",
    });
  }
}

export function logout(req: Request, res: Response) {
  const userId = req.userId;
  res.clearCookie("refreshToken");
  return res.json({ msg: "User has logged out successfully" });
}
