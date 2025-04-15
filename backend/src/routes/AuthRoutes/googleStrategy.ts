import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../../prismaInstance";

passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const { name, email, sub } = profile._json;
        const existingUser = await prisma.user.findFirst({
          where: {
            email: email,
          },
          select: {
            id: true,
            email: true,
            role: true,
          },
        });
        if (existingUser) {
          return cb(null, existingUser);
        }
        const newUser = await prisma.user.create({
          data: {
            username: name as string,
            email: email ?? "",
            googleId: sub,
          },
          select: {
            id: true,
            email: true,
            role: true,
          },
        });
        return cb(null, newUser);
      } catch (error) {
        return cb(error);
      }
    }
  )
);
