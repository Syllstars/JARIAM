// src/routes/auth.js

const express = require('express');
const router = express.Router();
const { login, register } = require('../services/userService'); // Exemple d'appel au service utilisateur
const { hasRole } = require('../middleware/authentification');
const { checkAccessControl } = require('../services/accessControlService');
const { asyncWrapper } = require('../middleware/errors');

// Route pour se connecter
router.post('/login', asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
  const token = await login(username, password);
  res.status(200).json({ token });
}));

// Route pour se déconnecter
router.post('/logout', asyncWrapper(async (req, res) => {
  // Optionnellement vous pouvez gérer la déconnexion dans le backend
  // comme invalidation du token, nettoyage des sessions etc.
  res.status(200).json({ message: 'Successfully logged out' });
}));

// Route pour rafraîchir le token
router.post('/refresh', asyncWrapper(async (req, res) => {
  const { refreshToken: oldRefreshToken } = req.body;
  const newTokens = await refreshToken(oldRefreshToken);
  res.status(200).json({ accessToken: newTokens.accessToken, refreshToken: newTokens.refreshToken });
}));

module.exports = router;
