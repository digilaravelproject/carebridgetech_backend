const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TeamMember = sequelize.define('TeamMember', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  position: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  profileImage: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  socialFacebook: {
    type: DataTypes.STRING(300),
    allowNull: true
  },
  socialTwitter: {
    type: DataTypes.STRING(300),
    allowNull: true
  },
  socialInstagram: {
    type: DataTypes.STRING(300),
    allowNull: true
  },
  socialLinkedin: {
    type: DataTypes.STRING(300),
    allowNull: true
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
  tableName: 'team_members',
  timestamps: true
});

module.exports = TeamMember;
