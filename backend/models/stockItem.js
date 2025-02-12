const { DataTypes } = require('sequelize');
const sequelize = require('../db_setup');

const StockItem = sequelize.define('StockItem', {
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
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  unit: {
    type: DataTypes.ENUM('units', 'kg', 'liter', 'pieces'),
    allowNull: false,
  },
  pricePerUnit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  supplier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  purchaseDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('in stock', 'out of stock', 'ordered'),
    defaultValue: 'in stock',
  }
}, { timestamps: true });

module.exports = StockItem;
