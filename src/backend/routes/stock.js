// src/routes/stock.js

const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../middleware/errors');
const stockService = require('../services/stockService');
const { hasRole } = require('../middleware/authentification');

// Route pour récupérer tous les articles en stock
router.get('/items', hasRole('admin', 'manager'), asyncWrapper(async (req, res) => {
  const stockItems = await stockService.getAllStockItems();
  res.status(200).json(stockItems);
}));

// Route pour ajouter un nouvel article en stock
router.post('/items', hasRole('admin'), asyncWrapper(async (req, res) => {
  const { name, quantity, location } = req.body;
  const newItem = await stockService.addStockItem({ name, quantity, location });
  res.status(201).json(newItem);
}));

// Route pour mettre à jour les informations d'un article en stock
router.put('/items/:id', hasRole('admin', 'manager'), asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { name, quantity, location } = req.body;
  const updatedItem = await stockService.updateStockItem(id, { name, quantity, location });
  if (!updatedItem) {
    return res.status(404).json({ message: 'Stock item not found' });
  }
  res.status(200).json(updatedItem);
}));

// Route pour supprimer un article du stock
router.delete('/items/:id', hasRole('admin'), asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const deletedItem = await stockService.deleteStockItem(id);
  if (!deletedItem) {
    return res.status(404).json({ message: 'Stock item not found' });
  }
  res.status(204).json({ message: 'Stock item deleted successfully' });
}));

// Route pour obtenir les détails d'un article spécifique en stock
router.get('/items/:id', hasRole('admin', 'manager', 'staff'), asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const stockItem = await stockService.getStockItemById(id);
  if (!stockItem) {
    return res.status(404).json({ message: 'Stock item not found' });
  }
  res.status(200).json(stockItem);
}));

module.exports = router;
