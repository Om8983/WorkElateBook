import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const loginSchemaValidation = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const response = schema.safeParse(req.body);
    if (!response.success) {
      res.status(401).json({ msg: "Invalid User Login Credentials" });
      return;
    }
    response.data = req.body;
    next();
  };
};

export const signupSchemaValidation = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const response = schema.safeParse(req.body);
    if (!response.success) {
      res.status(401).json({ msg: "Invalid User Login Credentials" });
      return;
    }
    req.body = response.data;
    next();
  };
};
