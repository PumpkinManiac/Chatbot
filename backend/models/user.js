import mongoose from "mongoose";
import {randomUUID} from "crypto"

const chatSchema = mongoose.Schema({
    id:{ type: String, default: randomUUID },
    role: {type : String, enum: ["user", "model"] ,required: true}, // role of the user (user or assistant)
    // The Gemini API specifically uses "user" and "model".
    content: {type : String, required: true}, //message content
})
const userSchema = mongoose.Schema({  
    //properties of the user schema
    name:{type : String , required : true},
    email:{type : String , required : true , unique : true},
    password:{type : String , required : true},
    chats :[chatSchema], //array of chat objects

},{timestamps: true})

const User = mongoose.model("User" , userSchema); 

export default User;