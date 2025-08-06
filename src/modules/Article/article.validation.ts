import z from "zod";

export const articleZodSchema = z.object({
body:z.object({
      user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format'),  // Validates ObjectId format (24 chars hex)
  title: z.string().min(1, 'Title is required').max(255, 'Title cannot exceed 255 characters'),
  content: z.string().min(1, 'Content is required').max(5000, 'Content cannot exceed 5000 characters'),
  isPopular: z.boolean(),
  isFeatured: z.boolean(),
})
});