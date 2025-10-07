const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HomeHero = sequelize.define('HomeHero', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mainTitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'main_title'
  },
  subTitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'sub_title'
  },
  mainText: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'main_text'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  buttonText: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'button_text'
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'home_hero',
  timestamps: true,
  underscored: true
});

module.exports = HomeHero;
