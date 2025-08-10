import { z } from "zod";

// Create payload validation
export const createFlagUserSchema = z.object({
    body:z.object({

        notice: z.string().min(1, "notice is required"),
        message: z.string().min(1, "message is required"),
    })
})