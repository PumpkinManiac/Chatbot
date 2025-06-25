import { Router } from "express";
import UserRouter from "./userRoutes.js";
import chatRoutes from "./chatRoutes.js";

const router = Router();

router.use("/user" ,  UserRouter) //domain/api/v1/user
router.use("/chat", chatRoutes)  //dpomain/api/v1/chats

export default router;
