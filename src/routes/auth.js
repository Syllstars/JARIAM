const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');  // Importation de jsonwebtoken
const bcrypt = require('bcrypt');
const speakeasy = require("speakeasy");

const { User} = require('../models');

const loginLimiter = require("../middleware/rateLimiter");

const auditLogger = require("../middleware/auditLogger");

// Route pour l'inscription d'un utilisateur
router.post('/register', hasRole('admin'), async (req, res) => {
  const { username, password, email } = req.body;

  if(!username || !password || !email) {
    return res.status(400).json({ error: 'Missing username, password, or email' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, email });
    res.status(201).json({ message: 'User created', user: { username, email } });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Route pour la connexion de l'utilisateur
router.post('/login', loginLimiter, async (req, res) => {
  const {username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  } else {
    const payload = { username };
    const token = jwt.sign(payload, 'JARIAM', { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, 'JARIAM', { expiresIn: '7h' });

    return res.json({ token, refreshToken });
  }
});

router.post("/2fa/setup", async (req, res) => {
  try {
    const secret = speakeasy.generateSecret();
    const user = await User.findByPk(req.user.id);
    user.twoFactorSecret = secret.base32;
    await user.save();

    res.status(200).json({
      otpauth_url: secret.otpauth_url, // URL pour QR code
      message: "2FA setup complete",
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la configuration de 2FA", error });
  }
});

router.post("/2fa/verify", async (req, res) => {
  const { token } = req.body;
  const user = await User.findByPk(req.user.id);

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });

  if (verified) {
    res.status(200).json({ message: "2FA verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid 2FA token" });
  }
});

router.post("/change-password", auditLogger, async (req, res) => {
  const { newPassword } = req.body;
  const user = await User.findByPk(req.user.id);

  user.password = newPassword; // Hash et sauvegarde
  await user.save();

  res.status(200).json({ message: "Mot de passe modifié avec succès" });
});



module.exports = router;
