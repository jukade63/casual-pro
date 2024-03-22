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

  export const educationSchema = z.object({
    institution: z.string().min(1),
    degree: z.string().min(1),
    major: z.string().min(1),
    gradDate: z.string().min(1),
  });
  

  export const skillSchema = z.object({
    skillName: z.string().min(1),
    skillLevel: z.string().min(1),
    certification: z.string().optional(),  
    certLink: z.string().optional(),
  })