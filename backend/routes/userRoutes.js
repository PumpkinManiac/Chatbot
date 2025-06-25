import {Router} from 'express';
import { get } from 'http';
import { getAllUser, userLogin, userSignup, verifyUser } from '../Controllers/userControlller.js';
import { validate,signupValidator, loginValidator } from '../utils/validators.js';
import { verifyToken } from '../utils/tokenManager.js';

const UserRouter = Router();

UserRouter.get("/" ,getAllUser);
UserRouter.post("/signup", validate(signupValidator) ,userSignup)
UserRouter.post("/login", validate(loginValidator) ,userLogin)
UserRouter.get("/auth-status",verifyToken, verifyUser)


export default UserRouter;