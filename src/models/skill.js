const mongoose = require('mongoose');

// Création du schéma pour les compétences
const skillSchema = new mongoose.Schema(
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
    level: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'], // Niveaux possibles de compétence
    },
    type: {
      type: String,
      required: true,
      enum: ['technical', 'soft', 'management'], // Catégorie de compétence
    },
    isActive: {
      type: Boolean,
      default: true, // Par défaut, la compétence est active
    },
  },
  { timestamps: true }
);

// Création du modèle Skill
const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
