import express from "express"
import authMiddleware from "../middleware/auth.middleware"
const router:express.Router = express.Router()


router.route("/getQuiz").all(authMiddleware).get().post().delete()

export default router