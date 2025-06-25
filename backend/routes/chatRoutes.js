import {Router} from 'express';
import { verifyToken } from '../utils/tokenManager.js';
import { generateChatCompletion } from '../controllers/chatController.js';
import { chatCompletionValidator, validate } from '../utils/validators.js';

//Proctected API
const chatRoutes = Router();
chatRoutes.post("/new",validate(chatCompletionValidator),verifyToken, generateChatCompletion)

export default chatRoutes;