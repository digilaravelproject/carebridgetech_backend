const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HomeEcosystem = sequelize.define('HomeEcosystem', {
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
  tableName: 'home_ecosystem',
  timestamps: true,
  underscored: true
});

const HomeEcosystemItem = sequelize.define('HomeEcosystemItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ecosystemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'ecosystem_id',
    references: {
      model: 'home_ecosystem',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  link: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('large', 'small'),
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
  tableName: 'home_ecosystem_items',
  timestamps: false,
  underscored: true
});

// Define associations
HomeEcosystem.hasMany(HomeEcosystemItem, {
  foreignKey: 'ecosystemId',
  as: 'items'
});
HomeEcosystemItem.belongsTo(HomeEcosystem, {
  foreignKey: 'ecosystemId'
});

module.exports = { HomeEcosystem, HomeEcosystemItem };
