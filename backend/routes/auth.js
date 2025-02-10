// src/backend/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user'); // Utilisation du modèle Sequelize
const { asyncWrapper } = require('../middleware/errors');


router.post("/login", asyncWrapper(async (req, res) => {
  console.log("Tentative de connexion :", req.body); // 🔥 Debug

  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
  console.log("Utilisateur trouvé :", user ? user.username : "Aucun"); // 🔥 Debug
  if (!user) {
    return res.status(401).json({ message: "Utilisateur non trouvé" });
  }

  
  const isMatch = await bcrypt.compare(password, user.hashed_password);
  console.log("Mot de passe valide :", isMatch); // 🔥 Debug
  if (!isMatch) {
    return res.status(401).json({ message: "Mot de passe incorrect" });
  }

  
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  console.log("Token généré et envoyé au client :", token);  // 🔥 Debug
  res.status(200).json({ token });
}));


// Route pour se déconnecter
router.post('/logout', asyncWrapper(async (req, res) => {
  res.status(200).json({ message: 'Successfully logged out' });
}));

// Route pour rafraîchir le token
router.post('/refresh', asyncWrapper(async (req, res) => {
  try {
    const { refreshToken: oldRefreshToken } = req.body;
    
    if (!oldRefreshToken) {
      return res.status(400).json({ message: "Refresh token requis" });
    }

    if (typeof refreshToken !== "function") {
      return res.status(500).json({ message: "Erreur interne: refreshToken non défini" });
    }

    const newTokens = await refreshToken(oldRefreshToken);
    res.status(200).json({ accessToken: newTokens.accessToken, refreshToken: newTokens.refreshToken });
  } catch (error) {
    console.error("Erreur refreshToken :", error);
    res.status(500).json({ message: "Erreur lors du rafraîchissement du token" });
  }
}));

module.exports = router;
