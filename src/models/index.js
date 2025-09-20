const sequelize = require('../config/database');

// Import simplified models
const ContentItem = require('./ContentItem');
const TeamMember = require('./TeamMember');
const Product = require('./Product');
const CompanyLogo = require('./CompanyLogo');
const FormSubmission = require('./FormSubmission');
const MenuItem = require('./MenuItem');
const NewsArticle = require('./NewsArticle');
const NewsPageSettings = require('./NewsPageSettings');
const Platform = require('./Platform');

// No relationships needed for the simplified schema

// Export all models and sequelize instance
module.exports = {
  sequelize,
  ContentItem,
  TeamMember,
  Product,
  CompanyLogo,
  FormSubmission,
  MenuItem,
  NewsArticle,
  NewsPageSettings,
  Platform
};
