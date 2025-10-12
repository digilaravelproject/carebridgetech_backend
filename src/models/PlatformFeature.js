const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlatformFeature = sequelize.define('PlatformFeature', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  platformId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'platform_id',
    references: {
      model: 'product_platforms',
      key: 'platform_id'
    },
    onDelete: 'CASCADE'
  },
  iconUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'icon_url'
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'platform_features',
  timestamps: false,
  underscored: true
});

module.exports = PlatformFeature;
