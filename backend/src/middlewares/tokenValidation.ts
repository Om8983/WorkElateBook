import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    const validateToken = jwt.verify(accessToken, process.env.ACCESSTOKEN_SECRET ?? "")
    if (!validateToken) {
        res.status(401).json({ msg: "Unauthorized user detected" })
        return;
    }
    next();
}