const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  const host = process.env.MAIL_HOST;
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Missing MAIL_HOST, MAIL_USER, or MAIL_PASS environment variable"
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.MAIL_PORT || 587),
    secure: process.env.MAIL_SECURE === "true",
    auth: {
      user,
      pass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: user,
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw error;
  }
};

module.exports = mailSender;