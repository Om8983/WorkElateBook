import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {router as authRoutes} from "./routes/AuthRoutes/route"
import passport from "passport";
import { router } from "./routes/main-routes";


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
app.use("/routes", router)

app.listen(8080, () => {
  console.log("Running on server 8080");
});
