const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlatformImage = sequelize.define('PlatformImage', {
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
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'image_url'
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'display_order'
  },
  altText: {
    type: DataTypes.STRING(200),
    allowNull: true,
    field: 'alt_text'
  }
}, {
  tableName: 'platform_images',
  timestamps: false,
  underscored: true
});

module.exports = PlatformImage;
