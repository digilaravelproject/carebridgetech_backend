const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryKey: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'devices, kiosks, kits'
  },
  productName: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  specifications: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of specification strings'
  },
  mainImage: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  galleryImages: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of image URLs for carousel'
  },
  brochureUrl: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;
