import { z } from 'zod';

export const vipMemberSchema = z.object({
  body: z.object({

    subject: z
      .string()
      .min(3, 'Subject must be at least 3 characters')
      .max(100, 'Subject must be at most 100 characters'),

    question: z
      .string()
      .min(10, 'Question must be at least 10 characters')
      .max(1000, 'Question must be at most 1000 characters'),

  }),
});