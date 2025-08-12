import { z } from "zod";

// Create payload validation
export const createFlagUserSchema = z.object({
    body:z.object({
 user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'),
        notice: z.string().min(1, "notice is required"),
        message: z.string().min(1, "message is required"),
    })
})