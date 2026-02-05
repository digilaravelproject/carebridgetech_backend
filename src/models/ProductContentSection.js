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
    field: 'section_key',
    comment: 'how_it_works, achieve, target_audience, deployment, solutions'
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
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['platform_id', 'section_key']
    }
  ]
});

module.exports = ProductContentSection;
