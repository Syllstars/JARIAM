// src/routes/security.js

const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeUser } = require('../services/securityService');
const { asyncWrapper } = require('../middleware/errorHandler');
const { hasRole } = require('../middleware/authentification');

// Route pour l'authentification d'un utilisateur (connexion)
router.post('/login', asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
  const user = await authenticateUser(username, password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.status(200).json({ message: 'Login successful', token: user.token });
}));

// Route pour autoriser l'accès à une ressource en fonction du rôle de l'utilisateur
router.post('/authorize', hasRole('admin'), asyncWrapper(async (req, res) => {
  const { userId, resource } = req.body;
  const isAuthorized = await authorizeUser(userId, resource);
  if (isAuthorized) {
    res.status(200).json({ message: 'Access granted' });
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
}));

module.exports = router;
