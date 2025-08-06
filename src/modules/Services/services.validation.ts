import { z } from 'zod';

// ObjectId validation helper
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectId = z.string().regex(objectIdRegex, {
  message: 'Invalid ObjectId',
});



// Service Zod schema
export const serviceValidationSchema = z.object({
    body:z.object({

        contractorId: objectId,
        title: z.string().min(1),
        details: z.string().min(1),
        categoryName: z.string().min(1),
        subCategoryName: z.string().min(1),
        price: z.number().positive(),
    })
});
