import express from "express";
import {
  login,
  refreshedToken,
  signup,
} from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";
const router: express.Router = express.Router();

router.route("/auth/signup").post(signup);
router.route("/auth/login").post(login);

// router.route("/changeAvatar").all(authMiddleware).post(updateProfile);
// router.route("/updateProfile").all(authMiddleware).post(changeAvatar);

router.route("/refreshedToken").post(refreshedToken);
export default router;
