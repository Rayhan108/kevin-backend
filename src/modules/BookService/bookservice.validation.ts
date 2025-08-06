import mongoose from "mongoose";
import z from "zod";

export const IBookServicesSchema = z.object({
    body:z.object({
  user: z.string().refine(value => mongoose.Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId',
  }), // Ensure the user is a valid MongoDB ObjectId
  serviceType: z.string().min(1, { message: 'Service type is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  zip: z.string().min(1, { message: 'Zip code is required' }),
  projectDescription: z.string().optional(), // Optional field
  dateRange: z.string().min(1, { message: 'Date range is required' }),
  timeSlot: z.string().min(1, { message: 'Time slot is required' }),
  exactDate: z.string().min(1, { message: 'Exact date is required' }),
  exactTime: z.string().min(1, { message: 'Exact time is required' }),
  todoList: z.array(z.string()).min(1, { message: 'At least one task is required' }), // Array of strings
  status: z.enum(['booked', 'onTheWay', 'started', 'done']), // Enum validation for status
//   projectStatus: z.enum(['pending','accepted', 'rejected']), // Enum validation for projectStatus
    })

});

export const updateTaskZodSchema = z.object({
  body:z.object({
  bookedService: z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: 'Invalid MongoDB ObjectId format',
  }),
  todoList: z.array(z.string().min(1, 'Task cannot be empty')),
  })

});