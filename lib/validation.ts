import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Invalid Password" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
