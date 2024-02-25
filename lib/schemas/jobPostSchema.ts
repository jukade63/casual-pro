import { z } from "zod";

enum JobType {
    Casual = "casual",
    PartTime = "part-time",
    Temporary = "temporary",
  }  

export const jobPostSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    requirements: z.array(
      z.object({
        requirement: z.string().min(1, { message: "Requirement is required" }),
      })
    ),
    location: z.array(z.string().min(1, { message: "This field is required" })),
    startDate: z.string().min(1, { message: "Start date is required" }),
    endDate: z.string().min(1, { message: "End date is required" }),
    jobType: z.nativeEnum(JobType),
    paymentAmount: z.string().min(1,  { message: "Payment amount is required" }),
    category: z.string().min(1, { message: "Category is required" }),
  });