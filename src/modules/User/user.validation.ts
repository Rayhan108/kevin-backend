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



export const userValidation = {
    changeStatusValidationSchema,
    becomeContractorValidationSchema,
    changeProfilePictureValidationSchema

}