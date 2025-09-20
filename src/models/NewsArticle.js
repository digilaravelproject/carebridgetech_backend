const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NewsArticle = sequelize.define('NewsArticle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Article title'
  },
  summary: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Brief summary of the article (shown on hover)'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Full article content'
  },
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Article image URL'
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Article author name'
  },
  authorPosition: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Author job position'
  },
  authorCompany: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Author company name'
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether this article should be featured'
  },
  companyLogoUrl: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Company logo URL (for featured articles)'
  },
  videoUrl: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Optional video URL for featured articles'
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Order for displaying articles'
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft'
  }
}, {
  tableName: 'news_articles',
  timestamps: true
});

module.exports = NewsArticle;
