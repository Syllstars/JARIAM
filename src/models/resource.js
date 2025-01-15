const mongoose = require('mongoose');

// Création du schéma pour les ressources
const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['human', 'material', 'equipment'], // Définir les types de ressources
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0, // S'assurer que la quantité est un nombre positif
    },
    unit: {
      type: String,
      required: true,
      enum: ['units', 'hours', 'pieces', 'kg'], // Unités possibles pour les ressources
    },
    cost: {
      type: Number,
      required: true,
      min: 0, // Le coût ne peut pas être négatif
    },
    assignedToProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
    availability: {
      type: Boolean,
      default: true, // Ressource disponible par défaut
    },
  },
  { timestamps: true }
);

// Création du modèle Resource
const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
