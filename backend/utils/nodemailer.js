import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host:"smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
   const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  await transporter.sendMail({
    from: `"Peeyush" <${process.env.SENDER_EMAIL}>`, // sender address
    to: email,
    subject: 'Please verify your email',
    html: `
      <p>Thank you for signing up!</p>
      <p>Please verify your email by clicking this link:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `,
  });
};