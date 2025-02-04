// src/backend/routes/auth.js

const express = require('express');
const router = express.Router();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Login = require('../../frontend/components/Login').default;
const { login, register } = require('../services/userService'); // Exemple d'appel au service utilisateur
const { hasRole } = require('../middleware/authentification');
const { checkAccessControl } = require('../services/accessControlService');
const { asyncWrapper } = require('../middleware/errors');

// Route GET pour afficher la page de connexion en SSR
router.get('/', (req, res) => {
  const reactElement = ReactDOMServer.renderToString(React.createElement(Login));
  // Créer une page HTML simple en insérant le rendu React
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Login</title>
      </head>
      <body>
        <div id="root">${reactElement}</div>
        <!-- Vous devrez inclure ici vos scripts client pour hydrater l'application -->
        <script src="/static/js/main.js"></script>
      </body>
    </html>
  `;
  res.send(html);
});


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
