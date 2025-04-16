import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {router as authRoutes} from "./routes/AuthRoutes/route"
import {router as userRoute } from "./routes/user-routes"
import {router as reviewRoute} from "./routes/review-routes"
import {router as bookRoute} from "./routes/book-routes"
import passport from "passport";


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(passport.initialize())
app.use("/auth", authRoutes);
app.use("/users", userRoute)
app.use("/reviews", reviewRoute)
app.use("/books", bookRoute)
app.listen(8080, () => {
  console.log("Running on server 8080");
});
