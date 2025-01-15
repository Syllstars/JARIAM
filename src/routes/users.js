// src/routes/users.js

const express = require('express');
const router = express.Router();
const { hasRole } = require('../middleware/authentification');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../services/userService');
const { validateUser, validateUserUpdate } = require('../middleware/dataProcessing');
const { asyncWrapper } = require('../middleware/errors');

// Route pour récupérer tous les utilisateurs (accessible par les admins uniquement)
router.get('/', hasRole('admin'), asyncWrapper(async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
}));

// Route pour récupérer un utilisateur par son ID
router.get('/:id', asyncWrapper(async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
}));

// Route pour créer un nouvel utilisateur (accessible par les admins uniquement)
router.post('/', hasRole('admin'), validateUser, asyncWrapper(async (req, res) => {
  const newUser = await createUser(req.body);
  res.status(201).json(newUser);
}));

// Route pour mettre à jour un utilisateur (accessible par l'utilisateur lui-même ou un admin)
router.put('/:id', validateUserUpdate, asyncWrapper(async (req, res) => {
  const updatedUser = await updateUser(req.params.id, req.body);
  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(updatedUser);
}));

// Route pour supprimer un utilisateur (accessible par les admins uniquement)
router.delete('/:id', hasRole('admin'), asyncWrapper(async (req, res) => {
  const deletedUser = await deleteUser(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(204).send();
}));

module.exports = router;
