import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import { createQuiz } from "../controllers/quiz.controller";
const router: express.Router = express.Router();

// router.route("/getQuiz").all(authMiddleware).get().post().delete()

router.route("/createQuiz").all(authMiddleware).post(createQuiz);
export default router;
