import { Request, response, Response, Router } from "express";
import { prisma } from "../../prismaInstance";
import bcrypt from "bcrypt";
import { authFunction, passportAuth, userScope } from "./google-route";
import { userLoginSchema, userSignUpSchema } from "@om_wadhi/validation";
import { loginSchemaValidation, signupSchemaValidation } from "../../zod";
import jwt from "jsonwebtoken";
const router = Router();
router.get("/google", userScope);
router.get("/google/callback", passportAuth, authFunction);

router.post(
  "/signup",
  signupSchemaValidation(userSignUpSchema),
  async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (existingUser) {
        res.status(409).json({ msg: "user already exist " });
        return;
      }

      const saltRounds = 12;
      const hashedPass = await bcrypt.hash(password, saltRounds);

      const newUser = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPass,
        },
        select: {
          email: true,
          id: true,
          role: true,
        },
      });

      // assign access and refresh`
      const accessToken = jwt.sign(
        {
          id: newUser?.id,
          email: newUser?.email,
          role: newUser?.role,
          iat: Math.floor(Date.now() / 1000),
        },
        process.env.ACCESSTOKEN_SECRET ?? "",
        { expiresIn: "15min" }
      );

      const refreshToken = jwt.sign(
        {
          id: newUser?.id,
          role: newUser?.role,
          iat: Math.floor(Date.now() / 1000),
        },
        process.env.REFRESHTOKEN_SECRET ?? "",
        { expiresIn: "1d" }
      );

      res.cookie("accessToken", accessToken, {
        maxAge: 15 * 60 * 1000,
        secure: true,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 24 * 60 * 60,
        httpOnly: true,
        secure: true,
      });
      // return response
      res.status(200).json({ msg: "user signup success " });
      return;
    } catch (error) {
      res.status(500).json({ msg: "Error while signup" });
    }
  }
);
router.post(
  "/login",
  loginSchemaValidation(userLoginSchema),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!existingUser) {
        res.status(401).json({ msg: "user doesn't exist" });
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          email: true,
          id: true,
          role: true,
          password: true,
        },
      });
      const validatePass = await bcrypt.compare(password, user?.password ?? "");

      if (!validatePass) {
        res.status(401).json({ msg: "wrong password" });
        return;
      }
      // assign cookies
      const accessToken = jwt.sign(
        {
          id: user?.id,
          email: user?.email,
          role: user?.role,
          iat: Math.floor(Date.now() / 1000),
        },
        process.env.ACCESSTOKEN_SECRET ?? "",
        { expiresIn: "15min" }
      );

      const refreshToken = jwt.sign(
        {
          id: user?.id,
          role: user?.role,
          iat: Math.floor(Date.now() / 1000),
        },
        process.env.REFRESHTOKEN_SECRET ?? "",
        { expiresIn: "1d" }
      );

      res.cookie("accessToken", accessToken, {
        maxAge: 15 * 60 * 1000,
        secure: true,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 24 * 60 * 60,
        httpOnly: true,
        secure: true,
      });
      res.status(200).json({ msg: "user login success" });
      return;
    } catch (error) {
      res.status(500).json({ msg: "Error occured while login" });
      console.log(error);
      
      return;
    }
  }
);
export { router };
