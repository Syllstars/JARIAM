const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');  // Importation de jsonwebtoken

// Route pour l'authentification
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  // Vérification des identifiants (ici, on suppose que "newuser" et "newpassword" sont les bons)
  if (username === 'newuser' && password === 'newpassword') {
    // Création du token comme avant
    const payload = { username };
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

    return res.json({ token });
  }

  // Si les identifiants sont incorrects
  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
