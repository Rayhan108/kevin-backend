import { z } from 'zod';

// ObjectId validation helper
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectId = z.string().regex(objectIdRegex, {
  message: 'Invalid ObjectId',
});
// Subcategory schema validation
const SubCategorySchema = z.object({
  body:z.object({

    label: z.string().min(1), // Label should be a non-empty string
    value: z.string().min(1), // Value should be a non-empty string
    parent: z.string().min(1), // Parent should be a non-empty string
  })
});

// Category schema validation
const CategorySchema = z.object({
  body:z.object({

    label: z.string().min(1), // Label should be a non-empty string
    value: z.string().min(1), // Value should be a non-empty string
    subCategories: z.array(SubCategorySchema), // subCategories must be an array of valid SubCategory objects
  })
});


// Service Zod schema
export const serviceValidationSchema = z.object({
    body:z.object({

        contractorId: objectId,
        title: z.string().min(1),
        details: z.string().min(1),
 categoryName: z.array(CategorySchema),
        // subCategoryName: z.array(z.string()).optional(),
        price: z.number().positive(),
    })
});
