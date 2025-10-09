const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AboutPageSettings = sequelize.define('AboutPageSettings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Header Section
  headerTitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'header_title'
  },
  headerSubtitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'header_subtitle'
  },
  // Company Section
  companyDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'company_description'
  },
  companyImage: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'company_image'
  },
  // Mission Section
  missionTitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'mission_title'
  },
  missionHighlight: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'mission_highlight'
  },
  missionDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'mission_description'
  },
  missionImage: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'mission_image'
  },
  // Statistics Section
  statisticsTitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'statistics_title'
  },
  statisticsHighlight: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'statistics_highlight'
  },
  statisticsDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'statistics_description'
  },
  // Team Section
  teamTitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'team_title'
  },
  teamHighlight: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'team_highlight'
  },
  teamDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'team_description'
  },
  // Contact Section
  contactTitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'contact_title'
  },
  contactHighlight: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'contact_highlight'
  },
  contactEmail: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'contact_email'
  },
  contactPhone: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'contact_phone'
  },
  contactAddress: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'contact_address'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'about_page_settings',
  timestamps: true,
  underscored: true
});

module.exports = AboutPageSettings;
