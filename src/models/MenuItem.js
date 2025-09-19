const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  menuKey: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Menu identifier: main_navigation, footer_menu, etc.'
  },
  itemKey: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Item identifier: home, about, platforms, etc.'
  },
  label: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Display text for menu item'
  },
  route: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: 'Angular route path'
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  tableName: 'menu_items',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['menu_key', 'item_key']
    }
  ]
});

module.exports = MenuItem;
