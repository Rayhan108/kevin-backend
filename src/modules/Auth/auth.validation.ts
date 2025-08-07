import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
  }),
});



export const registerUserValidationSchema = z.object({
   body: z.object({
      firstName: z.string().trim().min(1, { message: "First name is required" }),
      lastName: z.string().trim().min(1, { message: "Last name is required" }),
  
      email: z.string().trim().email("Invalid email address"),
      phone: z.string().trim().min(1, { message: "Phone is required" }),
      password: z.string().min(6, { message: "Password must be at least 6 characters" }),
      address: z.string().min(1, { message: "Address is required" }),
      // ❌ image: z.string() ← remove this
    report: z
      .object({
        reason: z.string().optional(),
        feedback: z.string().optional(),
        image: z.string().optional(),
      })
      .optional(),
  }),
   })





export const updateRegisterUserValidationSchema = z.object({
  body: z.object({
    location: z.string().min(1, "Location is required"),
    zip: z.string().min(1, "ZIP code is required"),
    companyName: z.string().min(1, "Company name is required"),
    servicesYouProvide: z
      .array(z.string().min(1, "Service name cannot be empty"))
      .min(1, "At least one service must be provided"),
  }),
});

const forgotPasswordSchema = z.object({
      body: z.object({ email: z.string().email("Invalid email address"),})
 
});

export const verifyOtpSchema = z.object({ 
  body: z.object({
    email: z.string().email("Invalid email address"),
    otp: z.string()
      .length(6, "OTP must be exactly 6 digits")
      .regex(/^\d+$/, "OTP must contain only digits"),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(1, { message: 'Old password is required' }),
    newPassword: z.string().min(1, { message: 'New password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookie: z.object({
    refreshToken: z.string().min(1, { message: 'Refresh token is required!' }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerUserValidationSchema,

  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgotPasswordSchema,
  verifyOtpSchema
};
