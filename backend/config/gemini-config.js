import axios from "axios";
import "dotenv/config";

/**
 * Returns a pre-configured axios instance for calling Gemini API
 */
export function configureGemini() {
  return axios.create({
    baseURL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash`,
    params: { key: process.env.GEMINI_API_KEY },
    headers: {
      "Content-Type": "application/json"
    }
  });
}
