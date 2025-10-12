const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductCTASection = sequelize.define('ProductCTASection', {
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
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  buttonText: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'button_text'
  },
  buttonLink: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'button_link'
  }
}, {
  tableName: 'product_cta_sections',
  timestamps: true,
  underscored: true
});

module.exports = ProductCTASection;
