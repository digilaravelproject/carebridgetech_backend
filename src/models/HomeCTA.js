const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HomeCTA = sequelize.define('HomeCTA', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  buttonText: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'button_text'
  },
  buttonLink: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'button_link'
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
  tableName: 'home_cta',
  timestamps: true,
  underscored: true
});

module.exports = HomeCTA;
