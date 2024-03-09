import { z } from "zod";

export const signInSchema = z.object({
    email: z
      .string().trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address." }),
    password: z
      .string().trim()
      .min(1, { message: "Password must be at least 8 characters." }),
  })