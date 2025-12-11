import express from "express";
// import controllers for user-related operations
import {
  login,
  logOut,
  refreshedToken,
  signup,
} from "../controllers/user.controller";
// import authentication middleware to protect routes
import authMiddleware from "../middleware/auth.middleware";

// initialize express.Router
const router: express.Router = express.Router();


router.route("/auth/signup").post(signup);  // handle signup operation

router.route("/auth/login").post(login);  // handle login operation


// router.route("/changeAvatar").all(authMiddleware).post(updateProfile);
// router.route("/updateProfile").all(authMiddleware).post(changeAvatar);


router.route("/refreshedToken").post(refreshedToken); // handle refresh-token operation


router.route("/logout").all(authMiddleware).post(logOut); // handle logout operation

export default router;
