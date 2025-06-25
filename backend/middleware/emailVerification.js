// middlewares/emailVerification.js
import crypto from 'crypto';
import { sendVerificationEmail } from '../utils/nodemailer.js';
import User from '../models/user.js';

// 1️⃣ Generate & attach a one‑time token
export const attachVerificationToken = (req, res, next) => {
  req.verificationToken = crypto.randomBytes(32).toString('hex');
  next();
};

// 2️⃣ After the user is created (in req.createdUser), send the email
export const sendVerificationEmailMw = async (req, res, next) => {
  try {
    await sendVerificationEmail(
      req.createdUser.email,
      req.verificationToken
    );
    next();
  } catch (err) {
    next(err);
  }
};
