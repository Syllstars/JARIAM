const { DataTypes } = require('sequelize');
const sequelize = require('../db_setup');

const AuditLog = sequelize.define('AuditLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  target: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  targetId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, { timestamps: true });

module.exports = AuditLog;
