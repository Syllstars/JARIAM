const { DataTypes } = require('sequelize');
const sequelize = require('../db_setup');

const Assignment = sequelize.define('Assignment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Leader', 'Member'),
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Completed', 'Pending', 'Cancelled'),
    defaultValue: 'Active',
  }
}, { timestamps: true });

module.exports = Assignment;
