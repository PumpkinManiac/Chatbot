import User from '../models/user.js';
import {hash,compare} from 'bcrypt';
import { createToken } from '../utils/tokenManager.js';
import { COOKIE_NAME } from '../utils/constant.js';
import { sendVerificationEmail } from '../utils/nodemailer.js';
import crypto from 'crypto';

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
        console.log("Signup attempt for:", email);

        const existingUser = await User.findOne({email})

        if (existingUser) {
        console.log("Signup blocked: user already exists");
        return res.status(409).json({ message: "User already exists with this email" });
}

        const hashedPassword = await hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex'); //verification token

        const user = new User({
            name,
            email,
            password : hashedPassword, //encrypt the password before saving to database
            verificationToken
        }); 

        await user.save(); 
        req.createdUser = user;         

        // Send verification email
        await sendVerificationEmail(email, verificationToken);
        console.log("Verification email sent to:", email);

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
  message: "User registered successfully. Verification email sent.",
  name: user.name,
  email: user.email,
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
        console.log("Login attempt for:", email);

        const user = await User.findOne({email}) 
        if(!user) {
            return res.status(401).send("User not registered");
        }
        const isPasswordValid = await compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(403).send("Invalid password");
        }

        // Check if email is verified
        if (!user.isVerified) {
        return res.status(403).json({ message: "Please verify your email before logging in." });
        }

        console.log("Login successful:", email);
        //clear existing cookie
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
        return res.status(500).json({ message: "Internal server error", cause: error.message });
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
         console.error("Verify error:", error);
    return res.status(500).json({ message: "Internal server error", cause: error.message });
    }
}

export const userLogout = async (req, res) => {
    try {
        //user login
        const user = await User.findById(res.locals.jwtData.id); 
        if(!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }

        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied");
        }

        //ceate a token and store the cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed : true,
            path: '/',
        }); //clear the cookie if it exists

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            name: user.name,
            email : user.email,
        });
    } catch (error) { 
        console.log(error);
        return res.status(500).json({ message: "Internal server error", cause: error.message });
    }
}

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification token" });
    }

    user.verificationToken = null;
    user.isVerified = true; // assuming your User schema has `isVerified`
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", cause: err.message });
  }
};
