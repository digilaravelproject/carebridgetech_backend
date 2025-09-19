const { sequelize } = require('../models');
const {
  ContentItem,
  TeamMember,
  Product,
  CompanyLogo,
  FormSubmission,
  MenuItem
} = require('../models');

async function createTables() {
  try {
    console.log('🔄 Starting database migration...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Create tables
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Database tables created/updated successfully.');

    // Seed initial data
    await seedInitialData();

    console.log('🎉 Database migration completed successfully!');
  } catch (error) {
    console.error('❌ Database migration failed:', error);
    process.exit(1);
  }
}

async function seedInitialData() {
  console.log('🌱 Seeding initial data...');
  
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
      { pageKey: 'home', sectionKey: 'features', contentKey: 'feature1_title', contentValue: 'Integrated Suite of Telehealth Ecosystem' },
      { pageKey: 'home', sectionKey: 'features', contentKey: 'feature2_title', contentValue: 'Future Ready with ABHA and NHDM Compliance' },
      { pageKey: 'home', sectionKey: 'features', contentKey: 'feature3_title', contentValue: 'Real-Time Monitoring & Preventive Care' },
      { pageKey: 'home', sectionKey: 'features', contentKey: 'feature4_title', contentValue: 'Accessible Healthcare Anytime, Anywhere' },
      
      // Challenges section
      { pageKey: 'home', sectionKey: 'challenges', contentKey: 'section_title', contentValue: 'Remote Healthcare' },
      { pageKey: 'home', sectionKey: 'challenges', contentKey: 'section_subtitle', contentValue: 'Challenges' },
      { pageKey: 'home', sectionKey: 'challenges', contentKey: 'section_description', contentValue: 'Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.' },
      
      // About page content
      { pageKey: 'about', sectionKey: 'header', contentKey: 'main_title', contentValue: 'We\'re here to' },
      { pageKey: 'about', sectionKey: 'header', contentKey: 'subtitle', contentValue: 'guarantee your success' },
      { pageKey: 'about', sectionKey: 'company', contentKey: 'description', contentValue: 'At Carebridge Technologies, a subsidiary of Maestros Electronics, we\'re driven by one goal: to connect people to care—anywhere, anytime.' },
      
      // Contact page content
      { pageKey: 'contact', sectionKey: 'header', contentKey: 'title', contentValue: 'Get in' },
      { pageKey: 'contact', sectionKey: 'header', contentKey: 'subtitle', contentValue: 'touch today' },
      { pageKey: 'contact', sectionKey: 'header', contentKey: 'description', contentValue: 'Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.' }
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
      },
      {
        name: 'Sophie Moore',
        position: 'Head of Design',
        bio: 'Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.',
        profileImage: '/images/profile.svg',
        socialTwitter: 'https://twitter.com/sophiemoore',
        displayOrder: 2
      },
      {
        name: 'Andy Smith',
        position: 'Lead Developer',
        bio: 'Convallis posuere morbi leo urna molestie at elementum eu facilisis sapien pellentesque habitant.',
        profileImage: '/images/profile.svg',
        socialLinkedin: 'https://linkedin.com/in/andysmith',
        displayOrder: 3
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
      },
      {
        categoryKey: 'kiosks',
        productName: 'Health Kiosk Pro',
        specifications: [
          'Touchscreen interface',
          'Multi-parameter monitoring',
          'Patient data management',
          'Real-time reporting'
        ],
        mainImage: '/images/ImagePlaceholder.png',
        galleryImages: ['/images/ImagePlaceholder.png'],
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

    console.log('✅ Initial data seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding initial data:', error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  createTables().finally(() => {
    process.exit(0);
  });
}

module.exports = { createTables, seedInitialData };
