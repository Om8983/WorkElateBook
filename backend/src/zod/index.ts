import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

// credential validation
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
      res.status(401).json({ msg: "Invalid User SignUp Credentials" });
      return;
    }
    req.body = response.data;
    next();
  };
};

// user update schema validation
export const infoUpdateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const response = schema.safeParse(req.body);
    if (!response.success) {
      res.status(401).json({ msg: "Invalid User Information" });
      return;
    }
    req.body = response.data;
    next();
  };
};

// book schema validation
export const bookSchemaValidate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const response = schema.safeParse(req.body);
    if (!response.success) {
      res.status(401).json({ msg: "Invalid Book Schema" });
      return;
    }
    req.body = response.data;
    next();
  };
};
