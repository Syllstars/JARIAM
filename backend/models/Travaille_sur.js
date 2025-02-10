const { DataTypes } = require('sequelize');
const sequelize = require('../db_setup'); // Import de l'instance Sequelize
const User = require('./user'); // Import du modèle User
const Project = require('./project'); // Import du modèle Project

const Travaille_sur = sequelize.define('Travaille_sur', {
    ID_Users: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "ID_Users"
    },
    Id_projects: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    timestamps: true // Active `createdAt` et `updatedAt`
  });
  
module.exports = Travaille_sur;
  