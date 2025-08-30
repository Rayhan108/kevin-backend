import z from "zod";

export const refferValidationSchema = z.object({
body:z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),

})
});