import { z } from "zod";

export const authUserValidation = z.object({
  email: z.email("Invalid Email"),
  password: z
    .string()
    .max(20, "Password is too long")
    .min(3, "Password is too short"),
});

export const userNameValidation = z.object({
  username: z
    .string()
    .max(20, "Username is too long")
    .min(3, "Username is too short"),
});

