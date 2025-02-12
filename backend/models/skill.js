const { DataTypes } = require('sequelize');
const sequelize = require('../db_setup');

const Skill = sequelize.define('skill', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  level: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced', 'expert'),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('technical', 'soft', 'management'),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, { timestamps: true });

module.exports = Skill;
