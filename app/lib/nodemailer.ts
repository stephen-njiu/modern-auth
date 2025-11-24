import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SEND_EMAIL_SMTP_HOST, // or custom SMTP host
    secure: process.env.SEND_EMAIL_SMTP_PORT === "465", // true for 465, false for other ports
    port: process.env.SEND_EMAIL_SMTP_PORT ? parseInt(process.env.SEND_EMAIL_SMTP_PORT) : 587,
    auth: {
      user: process.env.SEND_EMAIL_FROM, // From email address
      pass: process.env.SEND_EMAIL_API_KEY, // App password (incase of gmail), API key or email password for custom domain emails
    },
});

export default transporter;