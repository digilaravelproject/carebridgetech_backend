const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductAchievement = sequelize.define('ProductAchievement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  iconUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'icon_url'
  },
  platformId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'platform_id',
    references: {
      model: 'product_platforms',
      key: 'platform_id'
    }
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
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
  tableName: 'product_achievements',
  timestamps: true,
  underscored: true
});

module.exports = ProductAchievement;
