const nodemailer = require("nodemailer");

// Configuration de l'email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Fonction d'envoi d'email
async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("Email envoyé : ", info.response);
  } catch (err) {
    console.error("Erreur lors de l'envoi de l'email : ", err);
  }
}

module.exports = { sendEmail };