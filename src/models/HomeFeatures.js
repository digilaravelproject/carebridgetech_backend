const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HomeFeatures = sequelize.define('HomeFeatures', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sectionTitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'section_title'
  },
  sectionSubtitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'section_subtitle'
  },
  feature1Title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'feature1_title'
  },
  feature2Title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'feature2_title'
  },
  feature3Title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'feature3_title'
  },
  feature4Title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'feature4_title'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'home_features',
  timestamps: true,
  underscored: true
});

module.exports = HomeFeatures;
