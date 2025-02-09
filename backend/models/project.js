const { DataTypes } = require('sequelize');
const sequelize = require('../db_setup'); // Import de l'instance Sequelize
const User = require('./user'); // Import du modèle User
const Resource = require('./resource'); // Import du modèle Resource

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    trim: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('not started', 'in progress', 'completed', 'on hold'),
    defaultValue: 'not started'
  },
  budget: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  }
}, {
  timestamps: true // Active `createdAt` et `updatedAt`
});

// 🔗 Définition des relations
Project.belongsTo(User, { as: 'manager', foreignKey: 'managerId' }); // Un projet a un seul manager
Project.belongsToMany(User, { as: 'teamMembers', through: 'project_teamMembers' }); // Un projet peut avoir plusieurs membres d'équipe
Project.belongsToMany(Resource, { as: 'resources', through: 'project_resources' }); // Un projet peut utiliser plusieurs ressources

module.exports = Project;
