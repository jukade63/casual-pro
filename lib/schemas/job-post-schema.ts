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
    startDate: z.date().min(new Date(), { message: "Date must be in the future" }),
    endDate: z.date().min(new Date(), { message: "Date must be in the future" }),
    jobType: z.nativeEnum(JobType),
    paymentAmount: z.string().min(1,  { message: "Payment amount is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    status: z.string().optional(),
    startTime: z.string(),
    endTime: z.string(),
  });