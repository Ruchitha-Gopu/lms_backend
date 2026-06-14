const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    await transporter.verify();
    console.log("SMTP Ready");

    await transporter.sendMail({
      from: `"LMS App" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: message,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email error:", error.message);
  }
};

module.exports = sendEmail;