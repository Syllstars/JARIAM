const express = require('express');
const router = express.Router();
const { User } = require('../models');
const authenticate = require('../middleware/auth');
const hasRole = require('../middleware/hasRole');

// Route pour récupérer tous les utilisateurs
router.get('/', (req, res) => {
  res.json({ users: [] });  // Placeholder
});

// Route pour récupérer un utilisateur
router.get('/:id', async (req, res, next) => {
  try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
          throw new NotFoundError('User not found');
      }
      res.status(200).json(user);
  } catch (err) {
      next(err); // Pass the error to the error handler middleware
  }
});

// Route pour créer un utilisateur
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: `Missing name or email` });
  }

  res.status(201).json({ message: `User created`, user: { name, email } });
});

// PUT /users/:id - Update a user
router.put('/:id', authenticate, async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    // Vérification de l'existence de l'utilisateur
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: `User not found` });
    }

  // Mise à jour des données utilisateur
  user.name = name || user.name;
  user.email = email || user.email;
  user.password = password || user.password;
  await user.save();

  res.json(user);
  } catch (error) {
    res.status(500).json({ error: `Server error` });
  }
});


// DELETE /users/:id - Delete a user
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const userId = req.params.id;

    // Vérification de l'existence de l'utilisateur
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: `User not found` });
    }

    // Suppression de l'utilisateur
    await user.destroy();

    res.json(user);
    } catch (error) {
      res.status(500).json({ error: `Server error` });
    }
});

// Route accessible uniquement aux admins
router.get('/admin', hasRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin!'});
});

// Route publique accessible à tous
router.get('/public', (req, res) => {
  res.json({ message: 'This route is public.' });
});


module.exports = router;
