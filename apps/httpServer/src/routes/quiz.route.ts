import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import { createAiQuiz, createQuiz, getAllQuiz } from "../controllers/quiz.controller";
const router: express.Router = express.Router();

router.route("/getQuiz").all(authMiddleware).get(getAllQuiz)

router.route("/createQuiz").all(authMiddleware).post(createQuiz);
router.route("/createAiQuiz").all(authMiddleware).post(createAiQuiz);
export default router;
