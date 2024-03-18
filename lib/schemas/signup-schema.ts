import { z } from "zod";

export const SignUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Username must be at least 3 characters." }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address." }),
    phoneNumber: z
      .string()
      .trim()
      .min(1, { message: "Phone number is required" }),
    password: z
      .string()
      .trim()
      .min(3, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string()
      .trim(),
    industry: z.string().min(1, { message: "Enter your business industry" }).optional(),
    description: z.string().min(1, { message: "Enter your business description" }).optional()

  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });