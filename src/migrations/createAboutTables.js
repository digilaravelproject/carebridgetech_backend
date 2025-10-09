const { sequelize } = require('../models');

async function createAboutTables() {
  try {
    console.log('Creating about page tables...');

    // Sync all about models
    await sequelize.sync({ alter: true });

    console.log('✅ About page tables created successfully');
    console.log('Inserting seed data...');

    // Import models
    const {
      AboutPageSettings,
      AboutMissionFeature,
      AboutStatistic
    } = require('../models');

    // 1. About Page Settings (Single Record)
    const settings = await AboutPageSettings.findOrCreate({
      where: { id: 1 },
      defaults: {
        // Header Section
        headerTitle: 'About',
        headerSubtitle: 'Carebridge Technologies',
        
        // Company Section
        companyDescription: 'Carebridge Technologies is pioneering the future of remote healthcare by delivering an integrated telemedicine ecosystem. We empower healthcare providers with cutting-edge platforms, connected devices, and on-demand clinical support—making quality care accessible anytime, anywhere.',
        companyImage: '/images/about-company.png',
        
        // Mission Section
        missionTitle: 'Our',
        missionHighlight: 'Mission',
        missionDescription: 'To bridge the gap between patients and healthcare providers through innovative telemedicine solutions, ensuring accessible, efficient, and quality healthcare for all.',
        missionImage: '/images/world-map.svg',
        
        // Statistics Section
        statisticsTitle: 'Our',
        statisticsHighlight: 'Commitment',
        statisticsDescription: 'Delivering excellence through measurable impact and continuous innovation in healthcare technology.',
        
        // Team Section
        teamTitle: 'Meet Our',
        teamHighlight: 'Team',
        teamDescription: 'Our diverse team of healthcare professionals, engineers, and innovators work together to revolutionize remote healthcare delivery.',
        
        // Contact Section
        contactTitle: 'Get In',
        contactHighlight: 'Touch',
        contactEmail: 'contact@carebridge.in',
        contactPhone: '+91 (123) 456-7890',
        contactAddress: '794 Mcallister St\nSan Francisco, 94102',
        
        isActive: true
      }
    });

    // 2. Mission Features
    const missionFeatures = [
      {
        title: 'Early Detection of Disease',
        description: 'Leveraging real-time monitoring and AI-powered analytics to identify health risks before they become critical, enabling proactive care and better patient outcomes.',
        icon: '/images/early-detection-icon.svg',
        displayOrder: 1
      },
      {
        title: 'Remote Patient Management',
        description: 'Comprehensive telemedicine platform enabling healthcare providers to monitor, diagnose, and treat patients remotely with seamless data integration and communication tools.',
        icon: '/images/remote-management-icon.svg',
        displayOrder: 2
      },
      {
        title: 'Community-Driven Wellness',
        description: 'Building healthier communities through accessible healthcare services, health camps, and preventive care programs that reach underserved populations.',
        icon: '/images/community-wellness-icon.svg',
        displayOrder: 3
      }
    ];

    for (const feature of missionFeatures) {
      await AboutMissionFeature.findOrCreate({
        where: { title: feature.title },
        defaults: feature
      });
    }

    // 3. Statistics
    const statistics = [
      {
        number: '99',
        symbol: '%',
        title: 'Customer satisfaction',
        description: 'Ensuring uninterrupted access for every user with 24/7 support and 99.9% uptime guarantee.',
        displayOrder: 1
      },
      {
        number: '32',
        symbol: 'M',
        title: 'Active users',
        description: 'Powering millions of health measurements daily across clinics, hospitals, and home care services.',
        displayOrder: 2
      },
      {
        number: '240',
        symbol: '%',
        title: 'Company growth',
        description: 'Accelerating adoption across clinics and enterprises with rapid expansion in telemedicine solutions.',
        displayOrder: 3
      }
    ];

    for (const stat of statistics) {
      await AboutStatistic.findOrCreate({
        where: { title: stat.title },
        defaults: stat
      });
    }

    console.log('✅ Seed data inserted successfully');
    console.log('\n📊 About Page Summary:');
    console.log('  - Page Settings: Created (single record)');
    console.log('  - Mission Features: 3 features added');
    console.log('  - Statistics: 3 statistics added');
    console.log('  - Team Members: Using existing TeamMember model');
    console.log('\n✅ About page setup complete!');
    console.log('🌐 API available at: GET /api/pages/about');

  } catch (error) {
    console.error('❌ Error creating about tables:', error);
    throw error;
  }
}

module.exports = createAboutTables;

// Run if called directly
if (require.main === module) {
  createAboutTables()
    .then(() => {
      console.log('\n✅ Migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Migration failed:', error);
      process.exit(1);
    });
}
