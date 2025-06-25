
import { GoogleGenAI } from "@google/genai";
import User from "../models/user.js";

const ai = new GoogleGenAI({ apiKey: "AIzaSyCU3whc5Ek_YlUc6Z1QifOMnci623p8Du4" });

export const generateChatCompletion = async (req, res) => {   
  const { message } = req.body;
try {
  const user = await User.findById(res.locals.jwtData.id);
  console.log("User ID:", res.locals.jwtData.id);
  if (!user)
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });

  //grab chats of the user to understand the context of conversation
  // Step 1: Convert user's chat history into Gemini format
  const history = user.chats.map(({ role, content }) => ({
      role,
      parts: [{ text: content }],
    }));

      // Step 2: Add the new user message to both history and DB array
    const newMessage = { role: "user", content: message };
    history.push({ role: "user", parts: [{ text: message }] });
    user.chats.push(newMessage);

    // Step 3: Create Gemini chat session with history
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history,
    });
    
        // Step 4: Send the message to Gemini
    const result = await chat.sendMessage({ message });

        // Step 5: Add model's response to user's chat history
    const reply = {
      role: "model",
      content: result.text,
    };

    user.chats.push(reply);
    await user.save();


       // Step 6: Send back updated chats
    return res.status(200).json({ chats: user.chats });

} catch (error) {
  console.error("Gemini Chat Error:", error);
    return res.status(500).json({ error: "Failed to get response from Gemini." });
}

};

export const sendChatsToUser = async (req, res) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id); 
        if(!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }

        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied");
        }

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            chats: user.chats
        });
    } catch (error) { 
        console.log(error);
        return res.status(200).jaon({message: "Error", cause: error.message})
    }
}

export const deleteChats = async (req, res) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id); 
        if(!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }

        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied");
        }
        user.chats = []; // Clear the chats array
        await user.save(); // Save the changes to the database
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
        });
    } catch (error) { 
        console.log(error);
        return res.status(200).jaon({message: "Error", cause: error.message})
    }
}