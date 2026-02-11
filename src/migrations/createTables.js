const { sequelize } = require('../models');
const {
  ContentItem,
  TeamMember,
  Product,
  CompanyLogo,
  FormSubmission,
  MenuItem,
  NewsArticle,
  NewsPageSettings,
  Platform,
  ProductCategory, // [NEW] Import Category Model
  ContactDetails
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

    // Seed Product Categories
    const categories = [
      { categoryKey: 'devices', displayName: 'Devices', description: 'Medical devices and equipment', displayOrder: 1 },
      { categoryKey: 'kiosks', displayName: 'Kiosks', description: 'Self-service health kiosks', displayOrder: 2 },
      { categoryKey: 'kits', displayName: 'Kits', description: 'Medical kits and packages', displayOrder: 3 }
    ];

    for (const category of categories) {
      await ProductCategory.findOrCreate({
        where: { categoryKey: category.categoryKey },
        defaults: category
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

    // Seed News Articles
    const newsArticles = [
      {
        title: 'Facebook Partners with Carebridge for Healthcare Innovation',
        summary: 'Carebridge announces revolutionary monitoring system',
        content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Vel mauris turpis vel eget nec orci nec ipsum Elementum felis eu pellentesque velit vulputate. Blandit consequat facilisi sagittis ut quis Integer et faucibus elemen.',
        imageUrl: '/images/news-img.svg',
        author: 'John Carter',
        authorPosition: 'Creative Director',
        authorCompany: 'Facebook',
        isFeatured: true,
        companyLogoUrl: '/images/Facebook.png',
        videoUrl: 'https://example.com/video',
        displayOrder: 1,
        status: 'published'
      },
      {
        title: 'New Healthcare Device Launch',
        summary: 'Carebridge announces revolutionary monitoring system',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at lacinia ex, in mollis lectus.',
        imageUrl: '/images/img-1.png',
        author: 'Sarah Johnson',
        isFeatured: false,
        displayOrder: 2,
        status: 'published'
      },
      {
        title: 'Telemedicine Platform Updates',
        summary: 'Latest updates to our comprehensive telemedicine solution',
        content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        imageUrl: '/images/img-2.png',
        author: 'Dr. Michael Chen',
        authorPosition: 'Chief Medical Officer',
        isFeatured: false,
        displayOrder: 3,
        status: 'published'
      },
      {
        title: 'Remote Monitoring Success Stories',
        summary: 'Real-world impact of our remote monitoring solutions',
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        imageUrl: '/images/img-3.png',
        author: 'Lisa Rodriguez',
        authorPosition: 'Head of Clinical Affairs',
        isFeatured: false,
        displayOrder: 4,
        status: 'published'
      }
    ];

    for (const article of newsArticles) {
      await NewsArticle.findOrCreate({
        where: { title: article.title },
        defaults: article
      });
    }

    // Seed News Page Settings
    const newsPageSettings = {
      mainHeading: 'Latest',
      mainHeadingHighlight: 'News & Updates',
      mainDescription: 'Stay updated with the latest healthcare technology innovations, research breakthroughs, and company announcements.',
      backgroundImageUrl: '/images/news-bg.jpg',
      socialHeading: 'Follow us on',
      socialHeadingHighlight: 'Linkedin',
      socialDescription: 'Explore our collection of healthcare technology articles, research papers, and industry updates.',
      socialButtonText: 'Follow Us',
      socialMediaLink: 'https://www.linkedin.com/company/carebridge-health'
    };

    await NewsPageSettings.findOrCreate({
      where: { id: 1 },
      defaults: newsPageSettings
    });

    // Seed Platform Data
    const platforms = [
      {
        platformName: 'CareBridge Telemedicine Platform',
        description: 'Comprehensive telemedicine solution for healthcare providers and patients.',
        features: [
          'Real-time video consultations',
          'Patient data management',
          'Electronic health records integration',
          'Prescription management',
          'Appointment scheduling',
          'Multi-device compatibility'
        ],
        images: [
          '/images/platform-telemedicine-1.jpg',
          '/images/platform-telemedicine-2.jpg',
          '/images/platform-telemedicine-3.jpg'
        ],
        platformKey: 'telemedicine',
        technicalSpecs: [
          'Cloud-based infrastructure',
          'HIPAA compliant security',
          'API integration support',
          'Mobile responsive design',
          'Real-time data synchronization'
        ],
        benefits: [
          'Reduce patient waiting times',
          'Increase healthcare accessibility',
          'Lower operational costs',
          'Improve patient satisfaction',
          'Enhanced care coordination'
        ],
        displayOrder: 1,
        status: 'active'
      },
      {
        platformName: 'Remote Monitoring System',
        description: 'Advanced remote patient monitoring for chronic disease management.',
        features: [
          'Continuous vital sign monitoring',
          'Alert system for healthcare providers',
          'Patient self-reporting tools',
          'Trend analysis and reporting',
          'Family caregiver access',
          'Emergency response integration'
        ],
        images: [
          '/images/platform-monitoring-1.jpg',
          '/images/platform-monitoring-2.jpg'
        ],
        platformKey: 'remote-monitoring',
        technicalSpecs: [
          'IoT device connectivity',
          'Real-time data processing',
          'AI-powered analytics',
          'Secure data transmission',
          '24/7 system availability'
        ],
        benefits: [
          'Early disease detection',
          'Prevent hospital readmissions',
          'Personalized care plans',
          'Improved patient outcomes',
          'Cost-effective healthcare delivery'
        ],
        displayOrder: 2,
        status: 'active'
      }
    ];

    for (const platform of platforms) {
      await Platform.findOrCreate({
        where: { platformKey: platform.platformKey },
        defaults: platform
      });
    }

    // Seed Contact Details
    const contactDetails = [
      {
        sectionTitle: 'OUR COMPANY',
        entityName: 'Carebridge Technologies India Private Limited',
        address: 'EL 66, TTC Industrial Area, Electronic Zone,\nMahape, Navi Mumbai - 400 710, INDIA',
        phoneNumbers: '022-27611193/94',
        fax: '022-27610093',
        emails: 'tendulkar@metsl.in',
        displayOrder: 1,
        isActive: true
      },
      {
        sectionTitle: 'REGISTRAR & TRANSFER AGENTS',
        entityName: 'Link Intime India Private Limited',
        address: 'C 101, 247 Park, L.B.S.Marg, Vikhroli\n(West),Mumbai - 400083',
        phoneNumbers: '022 - 4918 6270',
        fax: '022 - 4918 6060',
        emails: 'rnt.helpdesk@linkintime.co.in',
        displayOrder: 2,
        isActive: true
      },
      {
        sectionTitle: 'DETERMINING MATERIALITY OF EVENT AND MAKING DISCLOSURES',
        entityName: 'Mr. Harshad Patel',
        address: '', // No address provided for this entry
        phoneNumbers: '022-27611193/94',
        fax: '',
        emails: 'cs@metsl.in',
        displayOrder: 3,
        isActive: true
      }
    ];

    for (const contact of contactDetails) {
      await ContactDetails.findOrCreate({
        where: { sectionTitle: contact.sectionTitle },
        defaults: contact
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
