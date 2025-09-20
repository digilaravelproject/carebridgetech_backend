const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NewsPageSettings = sequelize.define('NewsPageSettings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mainHeading: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Latest',
    comment: 'Main heading text (e.g., "Latest")'
  },
  mainHeadingHighlight: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'News & Updates',
    comment: 'Highlighted part of main heading'
  },
  mainDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'Stay updated with the latest healthcare technology innovations, research breakthroughs, and company announcements.',
    comment: 'Main section description text'
  },
  backgroundImageUrl: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Background image for news section'
  },
  socialHeading: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Follow us on',
    comment: 'Social section heading text'
  },
  socialHeadingHighlight: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Linkedin',
    comment: 'Highlighted part of social heading'
  },
  socialDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'Explore our collection of healthcare technology articles, research papers, and industry updates.',
    comment: 'Social section description text'
  },
  socialButtonText: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Follow Us',
    comment: 'Social media button text'
  },
  socialMediaLink: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 'https://www.linkedin.com/company/carebridge-health',
    comment: 'Social media profile URL'
  }
}, {
  tableName: 'news_page_settings',
  timestamps: true
});

module.exports = NewsPageSettings;
