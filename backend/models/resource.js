const { DataTypes } = require('sequelize');
const sequelize = require('../db_setup');

const Resource = sequelize.define('Resource', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('human', 'material', 'equipment'),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit: {
    type: DataTypes.ENUM('units', 'hours', 'pieces', 'kg'),
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, { timestamps: true });

module.exports = Resource;
