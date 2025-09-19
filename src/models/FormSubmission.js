const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FormSubmission = sequelize.define('FormSubmission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  formType: {
    type: DataTypes.ENUM('contact', 'about'),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  company: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('new', 'read', 'responded'),
    defaultValue: 'new'
  }
}, {
  tableName: 'form_submissions',
  timestamps: true
});

module.exports = FormSubmission;
