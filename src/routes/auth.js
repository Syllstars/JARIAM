const express = require('express');
const router = express.Router();

// Route pour l'authentification
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: `Missing username or password` });
  }

  // Logique de login (placeholder)
  res.json({ message: `Logged in as ${username}` });
});

module.exports = router;
