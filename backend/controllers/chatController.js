import User from "../models/user.js";
import { configureGemini } from "../config/gemini-config.js";

export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;

        // 1. Find the user from the database
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered or Token malfunctioned" });
        }

        // 2. Format the user's chat history for the Gemini API
        const history = user.chats.map((chat) => ({
            role: chat.role,            // Takes 'role' from your schema
            parts: [{ text: chat.content }], // Takes 'content' from your schema
        }));

        // 3. Initialize the Gemini Model and start a chat with the history
        const genAI = configureGemini();
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const chat = model.startChat({ history });

        // 4. Send the new message and get the response
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const responseText = response.text();

        // 5. Save the new messages to the database, following your schema
        user.chats.push({ role: "user", content: message });
        user.chats.push({ role: "model", content: responseText });

        await user.save();

        // 6. Send the response back to the client
        return res.status(200).json({ reply: responseText });

    } catch (error) {
        console.error("Error in generateChatCompletion:", error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};