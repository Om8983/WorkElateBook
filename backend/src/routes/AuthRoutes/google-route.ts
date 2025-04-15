import passport from "passport";
import { Request, Response, Router } from "express";
require("./googleStrategy");
import jwt from "jsonwebtoken";
const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
type User = {
  email: string;
  id: string;
  role: string;
};

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/v1/users/login",
    session: false,
  }),
  function (req: Request, res: Response) {
    try {
      const user = req.user as User;
      const accessToken = jwt.sign(
        {
          id: user?.id,
          email: user?.email,
          iat: Math.floor(Date.now() / 1000),
        },
        process.env.ACCESSTOKEN_SECRET ?? "",
        { expiresIn: "15min" }
      );
      const refreshToken = jwt.sign(
        {
          id: user?.id,
          iat: Math.floor(Date.now() / 1000),
        },
        process.env.REFRESHTOKEN_SECRET ?? "",
        { expiresIn: "1d" }
      );

      res.cookie("accessToken", accessToken, {
        maxAge: 15 * 60,
        secure: true,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 24 * 60 * 60,
        httpOnly: true,
        secure: true,
      });
      res.status(200).json({ msg: "User Login Successfull" });
    } catch (error) {
      res.status(500).redirect("/auth/login");
    }
  }
);
export { router };
