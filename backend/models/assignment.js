const mongoose = require('mongoose');

// Création du schéma pour l'affectation d'une ressource à un projet
const assignmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    role: {
      type: String,
      enum: ['Leader', 'Member'],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Active', 'Completed', 'Pending', 'Cancelled'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

// Création du modèle Assignment
const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
