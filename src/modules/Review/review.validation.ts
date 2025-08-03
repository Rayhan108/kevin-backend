import z from "zod";

export const ReviewValidationSchema = z.object({
body:z.object({
     user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'),

  
  service: z.number().min(1).max(5, 'Service rating must be between 1 and 5'),
  behavior: z.number().min(1).max(5, 'Behavior rating must be between 1 and 5'),
  timeManagement: z.number().min(1).max(5, 'Time Management rating must be between 1 and 5'),
  price: z.number().min(1).max(5, 'Price rating must be between 1 and 5'),
  comment: z.string().max(500).optional(),  // Optional comment field with a max length of 500 characters
date: z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: "Invalid date format",
}).transform((val) => new Date(val))
})
});