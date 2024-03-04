import { z } from "zod";

export const SignupSchema = z
.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  userType: z.enum(["worker", "business"])
})
.refine((data) => data.confirmPassword === data.password, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});