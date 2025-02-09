const mongoose = require('mongoose');

// Création du schéma pour le contrôle d'accès
const accessControlSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['Admin', 'Manager', 'Employee'],
      required: true,
    },
    permissions: [
      {
        type: String,
        enum: [
          'view_project',
          'edit_project',
          'delete_project',
          'view_users',
          'edit_users',
          'delete_users',
          'manage_resources',
          'view_reports',
          'edit_reports',
          'manage_settings',
        ],
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// Création du modèle AccessControl
const AccessControl = mongoose.model('AccessControl', accessControlSchema);

module.exports = AccessControl;
