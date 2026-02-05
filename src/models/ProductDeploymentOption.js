const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductDeploymentOption = sequelize.define('ProductDeploymentOption', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  iconUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'icon_url'
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
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
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
  tableName: 'product_deployment_options',
  timestamps: true,
  underscored: true
});

const DeploymentPlatformMapping = sequelize.define('DeploymentPlatformMapping', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  deploymentOptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'deployment_option_id'
  },
  platformId: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'platform_id'
  }
}, {
  tableName: 'deployment_platform_mapping',
  timestamps: false,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['deployment_option_id', 'platform_id']
    }
  ]
});

module.exports = { ProductDeploymentOption, DeploymentPlatformMapping };
