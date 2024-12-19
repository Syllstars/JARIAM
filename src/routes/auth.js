const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');  // Importation de jsonwebtoken
const bcrypt = require('bcrypt');
const { User} = require('../models');

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
router.post('/login', async (req, res) => {
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

module.exports = router;
