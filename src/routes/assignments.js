// src/routes/assignments.js

const express = require('express');
const router = express.Router();
const { getAllAssignments, getAssignmentById, createAssignment, updateAssignment, deleteAssignment } = require('../services/assignmentService');
const { hasRole } = require('../middleware/authentification');
const { asyncWrapper } = require('../middleware/errors');

// Route pour récupérer toutes les attributions
router.get('/', asyncWrapper(async (req, res) => {
  const assignments = await getAllAssignments();
  res.status(200).json(assignments);
}));

// Route pour récupérer une attribution par son ID
router.get('/:id', asyncWrapper(async (req, res) => {
  const assignment = await getAssignmentById(req.params.id);
  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }
  res.status(200).json(assignment);
}));

// Route pour créer une nouvelle attribution (accessible par les admins uniquement)
router.post('/', hasRole('admin'), asyncWrapper(async (req, res) => {
  const newAssignment = await createAssignment(req.body);
  res.status(201).json(newAssignment);
}));

// Route pour mettre à jour une attribution (accessible par les admins uniquement)
router.put('/:id', hasRole('admin'), asyncWrapper(async (req, res) => {
  const updatedAssignment = await updateAssignment(req.params.id, req.body);
  if (!updatedAssignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }
  res.status(200).json(updatedAssignment);
}));

// Route pour supprimer une attribution (accessible par les admins uniquement)
router.delete('/:id', hasRole('admin'), asyncWrapper(async (req, res) => {
  const deletedAssignment = await deleteAssignment(req.params.id);
  if (!deletedAssignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }
  res.status(204).send();
}));

module.exports = router;
