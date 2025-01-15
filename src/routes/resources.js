// src/routes/resources.js

const express = require('express');
const router = express.Router();
const { getResources, getResourceById, createResource, updateResource, deleteResource } = require('../services/resourceService');
const { hasRole } = require('../middleware/authentification');
const { asyncWrapper } = require('../middleware/errors');

// Route pour récupérer toutes les ressources
router.get('/', hasRole('user'), asyncWrapper(async (req, res) => {
  const resources = await getResources();
  res.status(200).json(resources);
}));

// Route pour récupérer une ressource spécifique par son ID
router.get('/:id', hasRole('user'), asyncWrapper(async (req, res) => {
  const resource = await getResourceById(req.params.id);
  if (!resource) {
    return res.status(404).json({ message: 'Resource not found' });
  }
  res.status(200).json(resource);
}));

// Route pour créer une nouvelle ressource (accessible uniquement par un administrateur)
router.post('/', hasRole('admin'), asyncWrapper(async (req, res) => {
  const newResource = await createResource(req.body);
  res.status(201).json(newResource);
}));

// Route pour mettre à jour une ressource existante (accessible uniquement par un administrateur)
router.put('/:id', hasRole('admin'), asyncWrapper(async (req, res) => {
  const updatedResource = await updateResource(req.params.id, req.body);
  if (!updatedResource) {
    return res.status(404).json({ message: 'Resource not found to update' });
  }
  res.status(200).json(updatedResource);
}));

// Route pour supprimer une ressource (accessible uniquement par un administrateur)
router.delete('/:id', hasRole('admin'), asyncWrapper(async (req, res) => {
  const deletedResource = await deleteResource(req.params.id);
  if (!deletedResource) {
    return res.status(404).json({ message: 'Resource not found to delete' });
  }
  res.status(200).json({ message: 'Resource deleted successfully' });
}));

module.exports = router;
