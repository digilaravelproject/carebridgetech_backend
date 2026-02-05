const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactDetails = sequelize.define('ContactDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sectionTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entityName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  phoneNumbers: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fax: {
    type: DataTypes.STRING,
    allowNull: true
  },
  emails: {
    type: DataTypes.STRING,
    allowNull: true
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'contact_details',
  timestamps: true
});

module.exports = ContactDetails;
