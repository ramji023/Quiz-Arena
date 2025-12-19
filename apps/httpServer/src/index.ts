import dotenv from "dotenv";
// load environment variables
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

// create instance of express app
const app = express();


app.use(helmet()); // Help secure Express apps by setting HTTP response headers


// enable cors for selected origin and allow credentials
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
});

// apply rate limiting middleware to all requests
app.use(limiter);

// parse json bodies with a size limit of 10kb
app.use(express.json({ limit: "10kb" }));
// parse url-encoded bodies
app.use(express.urlencoded({ extended: true }));
// parse cookies from client requests
app.use(cookieParser());

// make sure prisma is connected
import { prisma } from "@repo/database";
async function testPrismaConnection() {
  try {
    await prisma.$queryRaw`SELECT 1;`;
    console.log("prisma connected successfully");
  } catch (error) {
    console.error("prisma connection failed:", error);
  }
}
testPrismaConnection();

// user-related routes like login, logout, signup etc
import userRoutes from "./routes/user.route";
app.use("/api/v1/user", userRoutes);

// quiz related routes like create,get,save and delete quizzes
import quizRoutes from "./routes/quiz.route";
app.use("/api/v1/quiz", quizRoutes);

// application error handler
import errorMiddleware from "./middleware/error.middleware";
app.use(errorMiddleware); // handle application error

// start server on 3000
app.listen(3000);
