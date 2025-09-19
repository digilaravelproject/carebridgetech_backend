const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContentItem = sequelize.define('ContentItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pageKey: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Page identifier: home, about, contact, device, news, product-details'
  },
  sectionKey: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Section identifier: hero, features, challenges, etc.'
  },
  contentKey: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Content identifier: title, description, image, etc.'
  },
  contentValue: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'The actual content value'
  },
  contentType: {
    type: DataTypes.ENUM('text', 'image', 'json'),
    defaultValue: 'text'
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
  tableName: 'content_items',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['page_key', 'section_key', 'content_key']
    }
  ]
});

module.exports = ContentItem;
