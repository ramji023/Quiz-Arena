import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
//route for admin
import userRoutes from "./routes/user.route";
app.use("/api/v1/user", userRoutes); // user operations like signup, signin

//route for quizes
import quizRoutes from "./routes/quiz.route";
app.use("/api/v1/quiz", quizRoutes);

// middleware to handle error
import errorMiddleware from "./middleware/error.middleware";
app.use(errorMiddleware); // handle application error
app.listen(3000);
