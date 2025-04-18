import passport from "passport";
import { Request, Response, Router } from "express";
require("./googleStrategy");
import jwt from "jsonwebtoken";
const router = Router();

export const userScope = passport.authenticate("google", {
  scope: ["profile", "email"],
});

type User = {
  email: string;
  id: string;
  role: string;
};

export const passportAuth = passport.authenticate("google", {
  failureRedirect: "/api/v1/users/login",
  session: false,
});
export const authFunction = function (req: Request, res: Response) {
  try {
    const user = req.user as User;
    const accessToken = jwt.sign(
      {
        id: user?.id,
        email: user?.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.ACCESSTOKEN_SECRET ?? "",
      { expiresIn: "15min" }
    );
    const refreshToken = jwt.sign(
      {
        id: user?.id,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.REFRESHTOKEN_SECRET ?? "",
      { expiresIn: "1d" }
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 24 * 60 * 60,
    });
    res.status(200).redirect("http://localhost:5173/discover")
    return;
  } catch (error) {
    res.status(500).redirect("/auth/login");
    return;
  }
};

export { router };
