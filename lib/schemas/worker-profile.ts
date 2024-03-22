import { z } from "zod";

export const experiencesSchema = z.object({
    position: z.string().min(1, { message: "Position is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    company: z.string().min(1, { message: "Company is required" }),
    startDate: z.date(),
    endDate: z.date(),
})

