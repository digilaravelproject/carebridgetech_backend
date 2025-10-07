const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HomeTestimonials = sequelize.define('HomeTestimonials', {
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
  tableName: 'home_testimonials',
  timestamps: true,
  underscored: true
});

const HomeTestimonialItem = sequelize.define('HomeTestimonialItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  testimonialSectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'testimonial_section_id',
    references: {
      model: 'home_testimonials',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  profileImage: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'profile_image'
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  position: {
    type: DataTypes.STRING(255),
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
  tableName: 'home_testimonial_items',
  timestamps: false,
  underscored: true
});

// Define associations
HomeTestimonials.hasMany(HomeTestimonialItem, {
  foreignKey: 'testimonialSectionId',
  as: 'items'
});
HomeTestimonialItem.belongsTo(HomeTestimonials, {
  foreignKey: 'testimonialSectionId'
});

module.exports = { HomeTestimonials, HomeTestimonialItem };
