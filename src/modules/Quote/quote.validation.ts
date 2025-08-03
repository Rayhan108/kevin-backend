import { z } from 'zod';

export const requestQuoteZodSchema = z.object({
      body: z.object({
  projectLocation: z.string({
    message: 'Project location is required',
  }),
  projectDescription: z.string().optional(),

  services: z.array(z.string()).min(1, 'At least one service must be selected'),

  date: z.coerce.date().refine((val) => !isNaN(val.getTime()), {
    message: 'Valid date is required',
  }),

  time: z.coerce.date().refine((val) => !isNaN(val.getTime()), {
    message: 'Valid time is required',
  }),

  priceRange: z.string().optional(),
})
      })


export const requestQuoteValudation ={
  requestQuoteZodSchema  
}