const express = require("express");
const { sendEmail } = require("../services/notificationsService");

const router = express.Router();

router.post("/email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await sendEmail(to, subject, text);
    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    res.status(500).json({ message: "Échec de l'envoi de l'email", error });
  }
});

module.exports = router;
