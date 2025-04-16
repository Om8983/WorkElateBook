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

export const userInfoUpdateSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
});

export const newBookSchema = z.object({
  bookName: z.string(),
  bookImage: z.string(),
  author: z.string(),
  brief: z.string(),
  description: z.string(),
});

export type SignUpSchema = z.infer<typeof userSignUpSchema>;
export type LoginSchema = z.infer<typeof userLoginSchema>;
export type UserUpdate = z.infer<typeof userInfoUpdateSchema>;
export type BookSchema = z.infer<typeof newBookSchema>