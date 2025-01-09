// src/routes/logs.js

const express = require('express');
const router = express.Router();
const { getLogs, getLogById, createLog, deleteLog } = require('../services/logService');
const { hasRole } = require('../middleware/authentification');
const { asyncWrapper } = require('../middleware/errorHandler');

// Route pour récupérer tous les logs
router.get('/', hasRole('admin'), asyncWrapper(async (req, res) => {
  const logs = await getLogs();
  res.status(200).json(logs);
}));

// Route pour récupérer un log spécifique par son ID
router.get('/:id', hasRole('admin'), asyncWrapper(async (req, res) => {
  const log = await getLogById(req.params.id);
  if (!log) {
    return res.status(404).json({ message: 'Log not found' });
  }
  res.status(200).json(log);
}));

// Route pour créer un nouveau log (accessible uniquement par un administrateur)
router.post('/', hasRole('admin'), asyncWrapper(async (req, res) => {
  const newLog = await createLog(req.body);
  res.status(201).json(newLog);
}));

// Route pour supprimer un log (accessible uniquement par un administrateur)
router.delete('/:id', hasRole('admin'), asyncWrapper(async (req, res) => {
  const deletedLog = await deleteLog(req.params.id);
  if (!deletedLog) {
    return res.status(404).json({ message: 'Log not found to delete' });
  }
  res.status(200).json({ message: 'Log deleted successfully' });
}));

module.exports = router;
