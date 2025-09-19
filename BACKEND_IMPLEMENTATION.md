# Carebridge Backend Implementation Guide
## Content-Only Dynamic System with MySQL + Express + AdminJS

## 🗄️ **Database Models (Sequelize)**

### **1. Content Items Model**

```javascript
// src/models/ContentItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContentItem = sequelize.define('ContentItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pageKey: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Page identifier: home, about, contact, device, news, product-details'
  },
  sectionKey: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Section identifier: hero, features, challenges, etc.'
  },
  contentKey: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Content identifier: title, description, image, etc.'
  },
  contentValue: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'The actual content value'
  },
  contentType: {
    type: DataTypes.ENUM('text', 'image', 'json'),
    defaultValue: 'text'
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
  tableName: 'content_items',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['pageKey', 'sectionKey', 'contentKey']
    }
  ]
});

module.exports = ContentItem;
```

### **2. Team Members Model**

```javascript
// src/models/TeamMember.js
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
```

### **3. Products Model**

```javascript
// src/models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryKey: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'devices, kiosks, kits'
  },
  productName: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  specifications: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of specification strings'
  },
  mainImage: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  galleryImages: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Array of image URLs for carousel'
  },
  brochureUrl: {
    type: DataTypes.STRING(500),
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
  tableName: 'products',
  timestamps: true
});

module.exports = Product;
```

### **4. Company Logos Model**

```javascript
// src/models/CompanyLogo.js
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
```

### **5. Form Submissions Model**

```javascript
// src/models/FormSubmission.js
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
```

### **6. Menu Items Model**

```javascript
// src/models/MenuItem.js
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
      fields: ['menuKey', 'itemKey']
    }
  ]
});

module.exports = MenuItem;
```

## ⚙️ **AdminJS Configuration**

```javascript
// src/admin/adminjs.config.js
const AdminJS = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
const uploadFeature = require('@adminjs/upload');
const path = require('path');

AdminJS.registerAdapter(AdminJSSequelize);

// Import models
const ContentItem = require('../models/ContentItem');
const TeamMember = require('../models/TeamMember');
const Product = require('../models/Product');
const CompanyLogo = require('../models/CompanyLogo');
const FormSubmission = require('../models/FormSubmission');
const MenuItem = require('../models/MenuItem');

const adminJs = new AdminJS({
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
        sort: { sortBy: 'displayOrder', direction: 'asc' }
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
            type: 'mixed',
            props: {
              rows: 6
            }
          },
          galleryImages: {
            type: 'mixed',
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
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'Carebridge Technologies',
    logo: '/images/logo.svg',
    favicon: '/favicon/favicon.ico',
    theme: {
      colors: {
        primary100: '#005783',
        primary80: '#007BA7',
        primary60: '#009EE0',
        primary40: '#4FC3E7',
        primary20: '#E8F4FD'
      }
    }
  }
});

module.exports = adminJs;
```

## 🔌 **API Routes**

### **Content Routes**

```javascript
// src/routes/content.js
const express = require('express');
const ContentItem = require('../models/ContentItem');
const router = express.Router();

// GET /api/content/:pageKey - Get all content for a page
router.get('/:pageKey', async (req, res) => {
  try {
    const { pageKey } = req.params;
    
    const contentItems = await ContentItem.findAll({
      where: { 
        pageKey, 
        status: 'active' 
      },
      order: [['sectionKey', 'ASC'], ['displayOrder', 'ASC']]
    });

    // Group content by sections
    const groupedContent = {};
    contentItems.forEach(item => {
      if (!groupedContent[item.sectionKey]) {
        groupedContent[item.sectionKey] = {};
      }
      groupedContent[item.sectionKey][item.contentKey] = item.contentValue;
    });

    res.json({
      pageKey,
      content: groupedContent
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/content/:pageKey/:sectionKey - Get specific section content
router.get('/:pageKey/:sectionKey', async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;
    
    const contentItems = await ContentItem.findAll({
      where: { 
        pageKey, 
        sectionKey,
        status: 'active' 
      },
      order: [['displayOrder', 'ASC']]
    });

    const sectionContent = {};
    contentItems.forEach(item => {
      sectionContent[item.contentKey] = item.contentValue;
    });

    res.json({
      pageKey,
      sectionKey,
      content: sectionContent
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### **Team Routes**

```javascript
// src/routes/team.js
const express = require('express');
const TeamMember = require('../models/TeamMember');
const router = express.Router();

// GET /api/team - Get all active team members
router.get('/', async (req, res) => {
  try {
    const teamMembers = await TeamMember.findAll({
      where: { status: 'active' },
      order: [['displayOrder', 'ASC'], ['name', 'ASC']]
    });

    const formattedMembers = teamMembers.map(member => ({
      id: member.id,
      name: member.name,
      position: member.position,
      bio: member.bio,
      profileImage: member.profileImage,
      socialLinks: {
        facebook: member.socialFacebook,
        twitter: member.socialTwitter,
        instagram: member.socialInstagram,
        linkedin: member.socialLinkedin
      }
    }));

    res.json({
      teamMembers: formattedMembers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### **Products Routes**

```javascript
// src/routes/products.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET /api/products/:category - Get products by category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const products = await Product.findAll({
      where: { 
        categoryKey: category,
        status: 'active' 
      },
      order: [['displayOrder', 'ASC'], ['productName', 'ASC']]
    });

    res.json({
      category,
      products: products.map(product => ({
        id: product.id,
        productName: product.productName,
        specifications: product.specifications || [],
        mainImage: product.mainImage,
        galleryImages: product.galleryImages || [],
        brochureUrl: product.brochureUrl
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products - Get all products grouped by category
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { status: 'active' },
      order: [['categoryKey', 'ASC'], ['displayOrder', 'ASC']]
    });

    const groupedProducts = {};
    products.forEach(product => {
      if (!groupedProducts[product.categoryKey]) {
        groupedProducts[product.categoryKey] = [];
      }
      groupedProducts[product.categoryKey].push({
        id: product.id,
        productName: product.productName,
        specifications: product.specifications || [],
        mainImage: product.mainImage,
        galleryImages: product.galleryImages || [],
        brochureUrl: product.brochureUrl
      });
    });

    res.json({
      productsByCategory: groupedProducts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### **Company Logos Routes**

```javascript
// src/routes/logos.js
const express = require('express');
const CompanyLogo = require('../models/CompanyLogo');
const router = express.Router();

// GET /api/logos - Get all active company logos
router.get('/', async (req, res) => {
  try {
    const logos = await CompanyLogo.findAll({
      where: { status: 'active' },
      order: [['displayOrder', 'ASC'], ['companyName', 'ASC']]
    });

    res.json({
      companyLogos: logos.map(logo => ({
        id: logo.id,
        companyName: logo.companyName,
        logoImage: logo.logoImage
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### **Forms Routes**

```javascript
// src/routes/forms.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const FormSubmission = require('../models/FormSubmission');
const router = express.Router();

// POST /api/forms/contact - Submit contact form
router.post('/contact', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, company, message } = req.body;

    const submission = await FormSubmission.create({
      formType: 'contact',
      name,
      email,
      phone: phone || null,
      company: company || null,
      message
    });

    res.status(201).json({ 
      message: 'Form submitted successfully',
      submissionId: submission.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/forms/about - Submit about page form
router.post('/about', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, company, message } = req.body;

    const submission = await FormSubmission.create({
      formType: 'about',
      name,
      email,
      phone: phone || null,
      company: company || null,
      message
    });

    res.status(201).json({ 
      message: 'Form submitted successfully',
      submissionId: submission.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### **Navigation Routes**

```javascript
// src/routes/navigation.js
const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// GET /api/navigation/:menuKey - Get navigation menu items
router.get('/:menuKey', async (req, res) => {
  try {
    const { menuKey } = req.params;
    
    const menuItems = await MenuItem.findAll({
      where: { 
        menuKey, 
        status: 'active' 
      },
      order: [['displayOrder', 'ASC'], ['label', 'ASC']]
    });

    res.json({
      menuKey,
      items: menuItems.map(item => ({
        id: item.id,
        itemKey: item.itemKey,
        label: item.label,
        route: item.route,
        displayOrder: item.displayOrder
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/navigation - Get all navigation menus
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll({
      where: { status: 'active' },
      order: [['menuKey', 'ASC'], ['displayOrder', 'ASC']]
    });

    const groupedMenus = {};
    menuItems.forEach(item => {
      if (!groupedMenus[item.menuKey]) {
        groupedMenus[item.menuKey] = [];
      }
      groupedMenus[item.menuKey].push({
        id: item.id,
        itemKey: item.itemKey,
        label: item.label,
        route: item.route,
        displayOrder: item.displayOrder
      });
    });

    res.json({
      menus: groupedMenus
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

## 🚀 **Main Server File**

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./src/config/database');
const adminJs = require('./src/admin/adminjs.config');
const AdminJSExpress = require('@adminjs/express');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    return sequelize.sync({ alter: true }); // Use { force: true } for development only
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// AdminJS configuration
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@carebridge.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return { email: ADMIN_EMAIL, role: 'admin' };
    }
    return null;
  },
  cookiePassword: process.env.COOKIE_SECRET || 'carebridge-admin-secret'
});

app.use(adminJs.options.rootPath, adminRouter);

// API Routes
app.use('/api/content', require('./src/routes/content'));
app.use('/api/team', require('./src/routes/team'));
app.use('/api/products', require('./src/routes/products'));
app.use('/api/logos', require('./src/routes/logos'));
app.use('/api/forms', require('./src/routes/forms'));
app.use('/api/navigation', require('./src/routes/navigation'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`AdminJS available at http://localhost:${PORT}${adminJs.options.rootPath}`);
});
```

## 📊 **Database Seed Data**

```javascript
// src/seeds/initialData.js
const ContentItem = require('../models/ContentItem');
const TeamMember = require('../models/TeamMember');
const Product = require('../models/Product');
const CompanyLogo = require('../models/CompanyLogo');
const MenuItem = require('../models/MenuItem');

async function seedData() {
  try {
    // Seed Home Page Content
    const homeContent = [
      // Hero section
      { pageKey: 'home', sectionKey: 'hero', contentKey: 'main_title', contentValue: 'Your Partner In' },
      { pageKey: 'home', sectionKey: 'hero', contentKey: 'sub_title', contentValue: 'Remote Health' },
      { pageKey: 'home', sectionKey: 'hero', contentKey: 'main_text', contentValue: 'Monitoring' },
      { pageKey: 'home', sectionKey: 'hero', contentKey: 'description', contentValue: 'Empowering healthcare providers and patients with an integrated telemedicine ecosystem—where data, devices, and care converge effortlessly.' },
      { pageKey: 'home', sectionKey: 'hero', contentKey: 'button_text', contentValue: 'Know More' },
      { pageKey: 'home', sectionKey: 'hero', contentKey: 'image', contentValue: '/images/home-img.png', contentType: 'image' },
      
      // Features section
      { pageKey: 'home', sectionKey: 'features', contentKey: 'section_title', contentValue: 'Innovating Remote Healthcare,' },
      { pageKey: 'home', sectionKey: 'features', contentKey: 'section_subtitle', contentValue: 'The Carebridge Way' },
      
      // Add more content items...
    ];

    for (const content of homeContent) {
      await ContentItem.findOrCreate({
        where: { 
          pageKey: content.pageKey, 
          sectionKey: content.sectionKey, 
          contentKey: content.contentKey 
        },
        defaults: content
      });
    }

    // Seed Team Members
    const teamMembers = [
      {
        name: 'John Carter',
        position: 'CEO & Co-Founder',
        bio: 'Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.',
        profileImage: '/images/profile.svg',
        socialLinkedin: 'https://linkedin.com/in/johncarter',
        displayOrder: 1
      }
    ];

    for (const member of teamMembers) {
      await TeamMember.findOrCreate({
        where: { name: member.name },
        defaults: member
      });
    }

    // Seed Products
    const products = [
      {
        categoryKey: 'devices',
        productName: 'MR 300',
        specifications: [
          '5" Color TFT display',
          '12 Leads simultaneous ECG acquisition',
          '3 Channel ECG Recording',
          'Interpretation Facility',
          'Memory storage for 5 patients',
          'Auto & Manual mode of operation',
          'PDF convertor to transfer ECG from device to USB',
          'Display of 12 Lead ECG waveform',
          'ECG lead annotation facility'
        ],
        mainImage: '/images/ImagePlaceholder.png',
        galleryImages: [
          '/images/ImagePlaceholder.png',
          '/images/ImagePlaceholder.png'
        ],
        displayOrder: 1
      }
    ];

    for (const product of products) {
      await Product.findOrCreate({
        where: { productName: product.productName },
        defaults: product
      });
    }

    // Seed Company Logos
    const logos = [
      { companyName: 'Google', logoImage: '/images/Google.png', displayOrder: 1 },
      { companyName: 'Facebook', logoImage: '/images/facebook-gray.png', displayOrder: 2 },
      { companyName: 'YouTube', logoImage: '/images/YouTube.png', displayOrder: 3 },
      { companyName: 'Pinterest', logoImage: '/images/Pinterest.png', displayOrder: 4 },
      { companyName: 'Twitch', logoImage: '/images/Twitch.png', displayOrder: 5 },
      { companyName: 'Webflow', logoImage: '/images/Webflow.png', displayOrder: 6 }
    ];

    for (const logo of logos) {
      await CompanyLogo.findOrCreate({
        where: { companyName: logo.companyName },
        defaults: logo
      });
    }

    // Seed Navigation Menu Items
    const navigationItems = [
      {
        menuKey: 'main_navigation',
        itemKey: 'home',
        label: 'Home',
        route: '/home',
        displayOrder: 1
      },
      {
        menuKey: 'main_navigation',
        itemKey: 'about',
        label: 'About',
        route: '/about-us',
        displayOrder: 2
      },
      {
        menuKey: 'main_navigation',
        itemKey: 'platforms',
        label: 'Platforms',
        route: '/product-details',
        displayOrder: 3
      },
      {
        menuKey: 'main_navigation',
        itemKey: 'services',
        label: 'Services',
        route: '#',
        displayOrder: 4
      },
      {
        menuKey: 'main_navigation',
        itemKey: 'devices',
        label: 'Devices',
        route: '/device',
        displayOrder: 5
      },
      {
        menuKey: 'main_navigation',
        itemKey: 'news',
        label: 'News',
        route: '/news',
        displayOrder: 6
      }
    ];

    for (const item of navigationItems) {
      await MenuItem.findOrCreate({
        where: { 
          menuKey: item.menuKey, 
          itemKey: item.itemKey 
        },
        defaults: item
      });
    }

    console.log('Seed data created successfully including navigation menu items');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

module.exports = seedData;
```

This implementation provides a complete backend system for managing only the text and image content while keeping the structure intact!
