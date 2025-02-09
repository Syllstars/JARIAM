// src/backend/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Utilisation du modèle Sequelize
const { asyncWrapper } = require('../middleware/errors');

// Route pour se connecter
router.post("/login", asyncWrapper(async (req, res) => {
  const { username, password } = req.body;

  console.log("Tentative de connexion :", username, password);

  if (!username || !password) {
    return res.status(400).json({ message: "username et mot de passe requis" });
  }

  // Chercher l'utilisateur dans la base avec Sequelize
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(401).json({ message: "Utilisateur non trouvé" });
  }

  // Vérifier si le mot de passe correspond
  const isMatch = await bcrypt.compare(password, user.hashed_password);
  if (!isMatch) {
    return res.status(401).json({ message: "Mot de passe incorrect" });
  }

  // Générer un token JWT
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    "secret_key",
    { expiresIn: "1h" }
  );

  res.status(200).json({ token });
}));

// Route pour se déconnecter
router.post('/logout', asyncWrapper(async (req, res) => {
  res.status(200).json({ message: 'Successfully logged out' });
}));

// Route pour rafraîchir le token
router.post('/refresh', asyncWrapper(async (req, res) => {
  const { refreshToken: oldRefreshToken } = req.body;
  const newTokens = await refreshToken(oldRefreshToken);
  res.status(200).json({ accessToken: newTokens.accessToken, refreshToken: newTokens.refreshToken });
}));

module.exports = router;
