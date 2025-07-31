import { z } from 'zod';
import { UserStatus } from '../Auth/auth.constant';


 const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

const becomeContractorValidationSchema = z.object({
  body: z.object({
    location: z.string().trim().min(1, { message: "Location is required" }),
    zip: z.string().trim().min(1, { message: "Zip code is required" }),
    companyName: z.string().trim().min(1, { message: "Company name is required" }),
    servicesYouProvide: z
      .array(z.string().trim().min(1))
      .min(1, { message: "At least one service is required" }),
    subServices: z
      .array(z.string().trim().min(1))
      .min(1, { message: "At least one service is required" }),
  }),
});

export const userValidation = {
    changeStatusValidationSchema,
    becomeContractorValidationSchema

}