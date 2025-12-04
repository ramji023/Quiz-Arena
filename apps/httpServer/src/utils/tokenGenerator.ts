import jwt from "jsonwebtoken";

export default function generateToken(payload: {
  id: string;
  email: string;
}) {
  try {
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_KEY as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION as any,
      }
    );
    const refreshToken = jwt.sign(
      { id: payload.id },
      process.env.REFRESH_TOKEN_KEY as string,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION as any }
    );
    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
  }
}
