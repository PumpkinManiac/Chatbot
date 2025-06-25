import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from '@google/generative-ai';

export const configureGemini = () => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("key is not defined in your environment variables.");
    }

    const genAI = new GoogleGenerativeAI({ apiKey });

    return genAI;
};