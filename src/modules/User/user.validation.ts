import { z } from 'zod';
import { UserStatus } from '../Auth/auth.constant';


export const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
