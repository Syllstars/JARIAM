// src/routes/auth.js

const express = require('express');
const router = express.Router();
const { login, logout, refreshToken } = require('../services/authService');
const { validateLogin, validateRefreshToken } = require('../middleware/validateUser');
const { asyncWrapper } = require('../middleware/errorHandler');

// Route pour se connecter
router.post('/login', validateLogin, asyncWrapper(async (req, res) => {
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
router.post('/refresh', validateRefreshToken, asyncWrapper(async (req, res) => {
  const { refreshToken: oldRefreshToken } = req.body;
  const newTokens = await refreshToken(oldRefreshToken);
  res.status(200).json({ accessToken: newTokens.accessToken, refreshToken: newTokens.refreshToken });
}));

module.exports = router;
