import {Router} from 'express';
import { getAllUser, userLogin, userLogout, userSignup, verifyUser ,verifyEmail } from '../controllers/userControlller.js';
import { validate,signupValidator, loginValidator } from '../utils/validators.js';
import { verifyToken } from '../utils/tokenManager.js';
import { attachVerificationToken, sendVerificationEmailMw } from '../middleware/emailVerification.js';

const UserRouter = Router();

UserRouter.get("/" ,getAllUser);
UserRouter.get("/verify-email", verifyEmail);
UserRouter.post(
  "/signup",validate(signupValidator),attachVerificationToken,userSignup,sendVerificationEmailMw
);
UserRouter.post("/login", validate(loginValidator) ,userLogin)
UserRouter.get("/auth-status",verifyToken, verifyUser)
UserRouter.get("/logout",verifyToken,userLogout)

export default UserRouter;