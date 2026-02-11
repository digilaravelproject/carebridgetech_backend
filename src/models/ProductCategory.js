const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductCategory = sequelize.define('ProductCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryKey: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: 'Unique key for code ref (e.g., devices, kiosks)'
  },
  displayName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Human readable name (e.g., Medical Devices)'
  },
  elementId: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'HTML ID if needed for frontend anchors'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'product_categories',
  timestamps: true,
  underscored: true
});

module.exports = ProductCategory;
