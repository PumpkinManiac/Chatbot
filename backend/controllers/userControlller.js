import User from '../models/user.js';
import {hash,compare} from 'bcrypt';
import { createToken } from '../utils/tokenManager.js';
import { COOKIE_NAME } from '../utils/constant.js';

export const getAllUser = async (req, res) => {
    //get all users from dtabase
    try {
        const users = await User.find(); 
        
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users: users
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message: "Error in fetching users",
            cause: error.message
        })
    }
}

export const userSignup = async (req, res) => { 
    try {
        //user signup
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(401).send("User already exists with this email");
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({
            name,
            email,
            password : hashedPassword //encrypt the password before saving to database
        }); 
        await user.save();       

        //ceate a token and store the cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed : true,
            path: '/',
        }); //clear the cookie if it exists

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+ 7);

        res.cookie(COOKIE_NAME, token,{
            path:'/' , 
            domain:"localhost", 
            expires, 
            httpOnly: true, 
            signed: true});

        return res.status(201).json({
            success: true,
            message: "Users created successfully",
            name: user.name,
            email : user.email,
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message: "Error in fetching users",
            cause: error.message
        })
    }
}

export const userLogin = async (req, res) => {
    try {
        //user login
        const {email, password} = req.body;
        const user = await User.findOne({email}) 
        if(!user) {
            return res.status(401).send("User not registered");
        }
        const isPasswordValid = await compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(403).send("Invalid password");
        }

        res.clearCookie(COOKIE_NAME, {httpOnly: true,
            domain: "localhost",
            signed : true,
            path: '/',
        }); //clear the cookie if it exists

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+ 7);

        res.cookie(COOKIE_NAME, token,{
            path:'/' , 
            domain:"localhost", 
            expires, 
            httpOnly: true, 
            signed: true});

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            name: user.name,
            email : user.email,
        });
    } catch (error) { 
        
    }
}

export const verifyUser = async (req, res) => {
    try {
        //user login
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
            name: user.name,
            email : user.email,
        });
    } catch (error) { 
        
    }
}