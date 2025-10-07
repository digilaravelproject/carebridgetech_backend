const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HomeTargetAudience = sequelize.define('HomeTargetAudience', {
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
  sectionHighlight: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'section_highlight'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'home_target_audience',
  timestamps: true,
  underscored: true
});

const HomeTargetAudienceTab = sequelize.define('HomeTargetAudienceTab', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  audienceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'audience_id',
    references: {
      model: 'home_target_audience',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  tabId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'tab_id'
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'img'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'desc'
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'display_order'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'home_target_audience_tabs',
  timestamps: false,
  underscored: true
});

// Define associations
HomeTargetAudience.hasMany(HomeTargetAudienceTab, {
  foreignKey: 'audienceId',
  as: 'tabs'
});
HomeTargetAudienceTab.belongsTo(HomeTargetAudience, {
  foreignKey: 'audienceId'
});

module.exports = { HomeTargetAudience, HomeTargetAudienceTab };
