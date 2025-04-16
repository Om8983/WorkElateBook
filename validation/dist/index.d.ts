import { z } from "zod";
export declare const userSignUpSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
}, {
    username: string;
    email: string;
    password: string;
}>;
export declare const userLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const userInfoUpdateSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username?: string | undefined;
    email?: string | undefined;
}, {
    username?: string | undefined;
    email?: string | undefined;
}>;
export declare const newBookSchema: z.ZodObject<{
    bookName: z.ZodString;
    bookImage: z.ZodString;
    author: z.ZodString;
    brief: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bookName: string;
    bookImage: string;
    author: string;
    brief: string;
    description: string;
}, {
    bookName: string;
    bookImage: string;
    author: string;
    brief: string;
    description: string;
}>;
export type SignUpSchema = z.infer<typeof userSignUpSchema>;
export type LoginSchema = z.infer<typeof userLoginSchema>;
export type UserUpdate = z.infer<typeof userInfoUpdateSchema>;
export type BookSchema = z.infer<typeof newBookSchema>;
