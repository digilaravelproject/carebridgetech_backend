const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Platform = sequelize.define('Platform', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  platformName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Detailed description of the platform'
  },
  features: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of feature strings'
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of image URLs for the platform'
  },
  platformKey: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: 'Unique identifier for URL routing'
  },
  technicalSpecs: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Technical specifications and requirements'
  },
  benefits: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of platform benefits'
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
  tableName: 'platforms',
  timestamps: true
});

module.exports = Platform;
