import { z } from "zod"; // import z class from Zod

//  wrote zod object to check client validation if user login or signup
export const authUserValidation = z.object({
  email: z.email("Invalid Email"),
  password: z
    .string()
    .max(20, "Password is too long")
    .min(3, "Password is too short"),
});

// check client validation if client update their name
export const userNameValidation = z.object({
  username: z
    .string()
    .max(20, "Username is too long")
    .min(3, "Username is too short"),
});
