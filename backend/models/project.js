const { DataTypes } = require('sequelize');
const sequelize = require('../db_setup'); // Import de l'instance Sequelize
const User = require('./user'); // Import du modèle User
const Resource = require('./resource'); // Import du modèle Resource

const Project = sequelize.define('projects', {
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
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
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
  },
  manager_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "manager_id"
  }
}, {
  timestamps: true // Active `createdAt` et `updatedAt`
});

module.exports = Project;
