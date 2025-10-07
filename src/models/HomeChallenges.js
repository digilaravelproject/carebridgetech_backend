const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HomeChallenges = sequelize.define('HomeChallenges', {
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
  tableName: 'home_challenges',
  timestamps: true,
  underscored: true
});

const HomeChallengeItem = sequelize.define('HomeChallengeItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  challengeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'challenge_id',
    references: {
      model: 'home_challenges',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  number: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
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
  tableName: 'home_challenge_items',
  timestamps: false,
  underscored: true
});

// Define associations
HomeChallenges.hasMany(HomeChallengeItem, {
  foreignKey: 'challengeId',
  as: 'items'
});
HomeChallengeItem.belongsTo(HomeChallenges, {
  foreignKey: 'challengeId'
});

module.exports = { HomeChallenges, HomeChallengeItem };
