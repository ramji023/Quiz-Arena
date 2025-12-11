import express from "express";
// import authentication route
import authMiddleware from "../middleware/auth.middleware";
// import quiz-related operations controllers
import { createAiQuiz, createQuiz, getAllQuiz, getSingleQuiz } from "../controllers/quiz.controller";

// initialize express.Router
const router: express.Router = express.Router();

router.route("/getAllQuiz").all(authMiddleware).get(getAllQuiz);  // handles getting all the quizzes of application (protected)

router.route("/getQuiz/:quizId").all(authMiddleware).get(getSingleQuiz); // handles getting single quiz data (protected)

router.route("/createQuiz").all(authMiddleware).post(createQuiz); // handles creating a new quiz (protected)

router.route("/createAiQuiz").all(authMiddleware).post(createAiQuiz); // handles creating  a new quiz using AI  (protected)


export default router;
