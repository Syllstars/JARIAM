const express = require('express');
const router = express.Router();
const { User } = require('../models');
const authenticate = require('../middleware/auth');
const hasRole = require('../middleware/hasRole');
const bcrypt = require('bcrypt');

// Route pour récupérer tous les utilisateurs
router.get('/', authenticate, hasRole('admin'), async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Route pour récupérer un utilisateur spécifique
router.get('/:id', authenticate, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// route pour créer un utilisateur
router.post('/', authenticate, hasRole('admin'), async(req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({error: 'Missing username, email, or password' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Route pour modifier un utilisateur
router.put('/:id', authenticate, hasRole('admin'), async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    retourn res.status(404).json({ error: 'User not found' });
  }

  const { username, email, password } = req.body;
  user.username = username || user.username;
  user.email = email || user.email;
  user.password = password || user.password;
  await user.save();

  res.json(user);
});

// Route pour supprimer un utilisateur
router.delete('/:id', authenticate, hasRole('admin'), async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    retourn res.status(404).json({ error: 'User not found' });
  }

  await user.destroy();
  res.json({ message: 'User deleted'});
});
          

module.exports = router;
