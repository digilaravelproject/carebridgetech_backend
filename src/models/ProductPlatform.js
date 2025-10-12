const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductPlatform = sequelize.define('ProductPlatform', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  platformId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    field: 'platform_id',
    comment: 'Unique identifier: Consensus, CoddleOnline, Rhythms24x7'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  logoUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'logo_url'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'display_order'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'product_platforms',
  timestamps: true,
  underscored: true
});

module.exports = ProductPlatform;
