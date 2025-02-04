// src/routes/notifications.js

const express = require('express');
const router = express.Router();
const { getNotifications, getNotificationById, createNotification, deleteNotification } = require('../services/notificationService');
const { hasRole } = require('../middleware/authentification');
const { asyncWrapper } = require('../middleware/errors');

// Route pour récupérer toutes les notifications
router.get('/', hasRole('user'), asyncWrapper(async (req, res) => {
  const notifications = await getNotifications();
  res.status(200).json(notifications);
}));

// Route pour récupérer une notification spécifique par son ID
router.get('/:id', hasRole('user'), asyncWrapper(async (req, res) => {
  const notification = await getNotificationById(req.params.id);
  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }
  res.status(200).json(notification);
}));

// Route pour créer une nouvelle notification (accessible uniquement par un administrateur)
router.post('/', hasRole('admin'), asyncWrapper(async (req, res) => {
  const newNotification = await createNotification(req.body);
  res.status(201).json(newNotification);
}));

// Route pour supprimer une notification (accessible uniquement par un administrateur)
router.delete('/:id', hasRole('admin'), asyncWrapper(async (req, res) => {
  const deletedNotification = await deleteNotification(req.params.id);
  if (!deletedNotification) {
    return res.status(404).json({ message: 'Notification not found to delete' });
  }
  res.status(200).json({ message: 'Notification deleted successfully' });
}));

module.exports = router;
