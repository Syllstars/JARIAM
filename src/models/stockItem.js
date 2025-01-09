const mongoose = require('mongoose');

// Création du schéma pour les articles en stock
const stockItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0, // Quantité ne peut pas être négative
    },
    unit: {
      type: String,
      required: true,
      enum: ['units', 'kg', 'liter', 'pieces'], // Unités possibles pour l'article
    },
    pricePerUnit: {
      type: Number,
      required: true,
      min: 0, // Le prix par unité ne peut pas être négatif
    },
    supplier: {
      type: String,
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now, // La date d'achat est par défaut la date actuelle
    },
    status: {
      type: String,
      enum: ['in stock', 'out of stock', 'ordered'], // Statut possible de l'article
      default: 'in stock',
    },
  },
  { timestamps: true }
);

// Création du modèle StockItem
const StockItem = mongoose.model('StockItem', stockItemSchema);

module.exports = StockItem;
