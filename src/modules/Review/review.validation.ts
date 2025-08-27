import z from 'zod';

export const ReviewValidationSchema = z.object({
  body: z.object({
    user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'),
    serviceId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'),

    rating: z
      .number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot be more than 5'), // Rating validation
    comment: z
      .string()
      .max(500, 'Comment cannot exceed 500 characters')
      .optional(),
  }),
});
