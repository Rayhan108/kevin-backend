import { z } from 'zod';

// ObjectId validation helper
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectId = z.string().regex(objectIdRegex, {
  message: 'Invalid ObjectId',
});

// Service Zod schema
export const serviceValidationSchema = z.object({
  body: z.object({
    contractorId: objectId,
    title: z.string().min(1, { message: 'Title is required' }),
    details: z.string().min(1, { message: 'Details are required' }),
    categoryName: z
      .array(z.string().trim().min(1, { message: 'Category is required' }))
      .min(1, { message: 'At least one category is required' }),
    // subCategoryName: z.array(z.string()).optional(), // Uncomment this if you want this field to be optional
    price: z.number().positive({ message: 'Price must be a positive number' }),
    type: z.enum(['indoor', 'outdoor', 'garden'], {
      message: 'Type is required and must be one of: indoor, outdoor, garden', // Custom error message
    }),
  }),
});
