const { DataTypes } = require('sequelize');
const sequelize = require('../db_setup');

const AccessControl = sequelize.define('AccessControl', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Manager', 'Employee'),
    allowNull: false,
  },
  permissions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  }
}, { timestamps: true });

module.exports = AccessControl;
