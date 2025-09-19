const AdminJS = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
const uploadFeature = require('@adminjs/upload');
const path = require('path');

// Register Sequelize adapter
AdminJS.registerAdapter(AdminJSSequelize);

// Import simplified models
const {
  ContentItem,
  TeamMember,
  Product,
  CompanyLogo,
  FormSubmission,
  MenuItem
} = require('../models');

const adminJs = new AdminJS({
  rootPath: '/admin',
  branding: {
    companyName: 'CareBridge Technologies',
    logo: '/assets/images/logo.svg',
    favicon: '/assets/favicon/favicon.ico',
    withMadeWithLove: false,
    theme: {
      colors: {
        primary100: '#005783',
        primary80: '#007BA7', 
        primary60: '#009EE0',
        primary40: '#4FC3E7',
        primary20: '#E8F4FD',
        grey100: '#1a1a1a',
        grey80: '#333333',
        grey60: '#666666',
        grey40: '#999999',
        grey20: '#cccccc',
        filterBg: '#f8f9fa',
        accent: '#007BA7',
        hoverBg: '#f1f1f1'
      }
    }
  },
  resources: [
    {
      resource: ContentItem,
      options: {
        parent: { name: 'Content Management', icon: 'FileText' },
        listProperties: ['pageKey', 'sectionKey', 'contentKey', 'contentType', 'status'],
        editProperties: ['pageKey', 'sectionKey', 'contentKey', 'contentValue', 'contentType', 'displayOrder', 'status'],
        filterProperties: ['pageKey', 'sectionKey', 'contentType', 'status'],
        sort: { sortBy: 'pageKey', direction: 'asc' },
        properties: {
          contentValue: {
            type: 'textarea',
            props: {
              rows: 4
            }
          }
        }
      }
    },
    {
      resource: TeamMember,
      options: {
        parent: { name: 'Team Management', icon: 'Users' },
        listProperties: ['name', 'position', 'status', 'displayOrder'],
        editProperties: ['name', 'position', 'bio', 'profileImage', 'socialFacebook', 'socialTwitter', 'socialInstagram', 'socialLinkedin', 'displayOrder', 'status'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          bio: {
            type: 'textarea'
          }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/team') } },
          properties: { key: 'profileImage', bucket: 'teamImages' }
        })
      ]
    },
    {
      resource: Product,
      options: {
        parent: { name: 'Product Management', icon: 'Package' },
        listProperties: ['productName', 'categoryKey', 'status', 'displayOrder'],
        editProperties: ['categoryKey', 'productName', 'specifications', 'mainImage', 'galleryImages', 'brochureUrl', 'displayOrder', 'status'],
        filterProperties: ['categoryKey', 'status'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          specifications: {
            type: 'textarea',
            props: {
              rows: 6
            }
          },
          galleryImages: {
            type: 'textarea',
            props: {
              rows: 4
            }
          }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/products') } },
          properties: { key: 'mainImage', bucket: 'productImages' }
        })
      ]
    },
    {
      resource: CompanyLogo,
      options: {
        parent: { name: 'Brand Management', icon: 'Image' },
        listProperties: ['companyName', 'status', 'displayOrder'],
        editProperties: ['companyName', 'logoImage', 'displayOrder', 'status'],
        sort: { sortBy: 'displayOrder', direction: 'asc' }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/logos') } },
          properties: { key: 'logoImage', bucket: 'companyLogos' }
        })
      ]
    },
    {
      resource: FormSubmission,
      options: {
        parent: { name: 'Form Management', icon: 'Mail' },
        listProperties: ['formType', 'name', 'email', 'status', 'createdAt'],
        showProperties: ['formType', 'name', 'email', 'phone', 'company', 'message', 'status', 'createdAt'],
        editProperties: ['status'],
        filterProperties: ['formType', 'status'],
        sort: { sortBy: 'createdAt', direction: 'desc' },
        actions: {
          new: { isVisible: false },
          delete: { isVisible: true },
          edit: { 
            isVisible: true,
            showInDrawer: true
          }
        }
      }
    },
    {
      resource: MenuItem,
      options: {
        parent: { name: 'Navigation', icon: 'Navigation' },
        listProperties: ['menuKey', 'itemKey', 'label', 'route', 'displayOrder', 'status'],
        editProperties: ['menuKey', 'itemKey', 'label', 'route', 'displayOrder', 'status'],
        filterProperties: ['menuKey', 'status'],
        sort: { sortBy: 'displayOrder', direction: 'asc' }
      }
    }
  ]
});

module.exports = adminJs;
