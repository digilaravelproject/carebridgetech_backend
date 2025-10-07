const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HomeCompanyLogos = sequelize.define('HomeCompanyLogos', {
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
  sectionSubtitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'section_subtitle'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'home_company_logos',
  timestamps: true,
  underscored: true
});

const HomeCompanyLogoItem = sequelize.define('HomeCompanyLogoItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  logoSectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'logo_section_id',
    references: {
      model: 'home_company_logos',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  companyName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'company_name'
  },
  logoImage: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'logo_image'
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
  tableName: 'home_company_logo_items',
  timestamps: false,
  underscored: true
});

// Define associations
HomeCompanyLogos.hasMany(HomeCompanyLogoItem, {
  foreignKey: 'logoSectionId',
  as: 'logos'
});
HomeCompanyLogoItem.belongsTo(HomeCompanyLogos, {
  foreignKey: 'logoSectionId'
});

module.exports = { HomeCompanyLogos, HomeCompanyLogoItem };
