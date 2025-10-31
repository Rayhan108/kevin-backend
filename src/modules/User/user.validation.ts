import { z } from 'zod';
import { UserStatus } from '../Auth/auth.constant';


 const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
 const changeProfilePictureValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});


export const editProfileSchema = z.object({
  body:z.object({
    firstName: z.string().min(1, "First name is required").optional(),
    lastName: z.string().min(1, "Last name is required").optional(),
    bio: z.string().max(500, "Bio can't be longer than 500 characters").optional(),
  })
});

export const editContractorProfileSchema = z.object({
  body: z.object({
    profileVedio: z.array(
      z.object({
        thumbImageUrl: z.string()
          .url("Thumbnail image URL must be a valid URL")
          .optional(),
        title: z.string()
          .min(1, "Title is required for each video")
          .optional(),
        videoUrl: z.string()
          .url("Video URL must be a valid URL")
          .optional(),
      })
    ).nonempty("At least one video is required").optional(),
  }),
});


 const becomeContractorValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .email({ message: 'Valid email is required' }),
   

    location: z
      .string()
      .trim()
      .min(1, { message: 'Location is required' }),

    zip: z
      .string()
      .trim()
      .min(1, { message: 'Zip code is required' }),

    companyName: z
      .string()
      .trim()
      .min(1, { message: 'Company name is required' }),

    noOfEmployee: z
      .string()
      .trim()
      .min(1, { message: 'Number of employee is required' }),

    servicesYouProvide: z
      .array(z.string().trim().min(1, { message: 'Service name is required' }))
      .min(1, { message: 'At least one service is required' }),

    subServices: z
      .array(z.string().trim().min(1, { message: 'Sub-service name is required' }))
      .min(1, { message: 'At least one sub-service is required' }),
  }),
});






export const UserReviewValidationSchema = z.object({
  body: z.object({

    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'),

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







export const userValidation = {
    changeStatusValidationSchema,
    becomeContractorValidationSchema,
    changeProfilePictureValidationSchema,
    UserReviewValidationSchema

}