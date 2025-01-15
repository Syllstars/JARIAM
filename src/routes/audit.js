// src/routes/audit.js

const express = require('express');
const router = express.Router();
const { getAuditLogById, createAuditLog } = require('../services/auditService');
const { hasRole } = require('../middleware/authentification');
const { asyncWrapper } = require('../middleware/errors');

// Route pour récupérer tous les logs d'audit
router.get('/', hasRole('admin'), asyncWrapper(async (req, res) => {
  const auditLogs = await getAuditLogs();
  res.status(200).json(auditLogs);
}));

// Route pour récupérer un log d'audit spécifique par son ID
router.get('/:id', hasRole('admin'), asyncWrapper(async (req, res) => {
  const auditLog = await getAuditLogById(req.params.id);
  if (!auditLog) {
    return res.status(404).json({ message: 'Audit log not found' });
  }
  res.status(200).json(auditLog);
}));

// Route pour créer un nouveau log d'audit (accessible uniquement par un administrateur)
router.post('/', hasRole('admin'), asyncWrapper(async (req, res) => {
  const newAuditLog = await createAuditLog(req.body);
  res.status(201).json(newAuditLog);
}));

module.exports = router;
