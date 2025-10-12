const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductContentSection = sequelize.define('ProductContentSection', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sectionKey: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'section_key',
    comment: 'how_it_works, achieve, target_audience, deployment, solutions'
  },
  titleMain: {
    type: DataTypes.STRING(200),
    allowNull: true,
    field: 'title_main'
  },
  titleHighlight: {
    type: DataTypes.STRING(200),
    allowNull: true,
    field: 'title_highlight'
  },
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'image_url'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'product_content_sections',
  timestamps: true,
  underscored: true
});

module.exports = ProductContentSection;
