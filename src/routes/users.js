const express = require('express');
const router = express.Router();

// Route pour récupérer tous les utilisateurs
router.get('/', (req, res) => {
  res.json({ users: [] });  // Placeholder
});

// Route pour créer un utilisateur
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: `Missing name or email` });
  }

  res.status(201).json({ message: `User created`, user: { name, email } });
});

module.exports = router;
