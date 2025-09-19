const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CompanyLogo = sequelize.define('CompanyLogo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  companyName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  logoImage: {
    type: DataTypes.STRING(500),
    allowNull: false
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
  tableName: 'company_logos',
  timestamps: true
});

module.exports = CompanyLogo;
