import { z } from "zod";
export const userSignUpSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignUpSchema = z.infer<typeof userSignUpSchema>;
export type LoginSchema = z.infer<typeof userLoginSchema>;