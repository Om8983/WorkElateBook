"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newBookSchema = exports.userInfoUpdateSchema = exports.userLoginSchema = exports.userSignUpSchema = void 0;
const zod_1 = require("zod");
exports.userSignUpSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.userInfoUpdateSchema = zod_1.z.object({
    username: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
});
exports.newBookSchema = zod_1.z.object({
    bookName: zod_1.z.string(),
    bookImage: zod_1.z.string(),
    author: zod_1.z.string(),
    brief: zod_1.z.string(),
    description: zod_1.z.string(),
});
