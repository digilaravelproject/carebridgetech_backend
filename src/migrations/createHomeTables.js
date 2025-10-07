const { sequelize } = require('../models');

async function createHomeTables() {
  try {
    console.log('Creating home page tables...');

    // Sync all home models
    await sequelize.sync({ alter: true });

    console.log('✅ Home page tables created successfully');
    console.log('Inserting seed data...');

    // Import models
    const {
      HomeHero,
      HomeFeatures,
      HomeChallenges,
      HomeChallengeItem,
      HomeEcosystem,
      HomeEcosystemItem,
      HomeTargetAudience,
      HomeTargetAudienceTab,
      HomeCompanyLogos,
      HomeCompanyLogoItem,
      HomeTestimonials,
      HomeTestimonialItem,
      HomeCTA
    } = require('../models');

    // 1. Hero Section
    const hero = await HomeHero.findOrCreate({
      where: { id: 1 },
      defaults: {
        mainTitle: 'Your Partner In',
        subTitle: 'Remote Health',
        mainText: 'Monitoring',
        description: 'Empowering healthcare providers and patients with an integrated telemedicine ecosystem—where data, devices, and care converge effortlessly.',
        buttonText: 'Know More',
        image: '/images/home-img.png',
        isActive: true
      }
    });

    // 2. Features Section
    const features = await HomeFeatures.findOrCreate({
      where: { id: 1 },
      defaults: {
        sectionTitle: 'Innovating Remote Healthcare,',
        sectionSubtitle: 'The Carebridge Way',
        feature1Title: 'Integrated Suite of Telehealth Ecosystem',
        feature2Title: 'Future Ready with ABHA and NHDM Compliance',
        feature3Title: 'Real-Time Monitoring & Preventive Care',
        feature4Title: 'Accessible Healthcare Anytime, Anywhere',
        isActive: true
      }
    });

    // 3. Challenges Section
    const challengesSection = await HomeChallenges.findOrCreate({
      where: { id: 1 },
      defaults: {
        sectionTitle: 'Remote Healthcare',
        sectionHighlight: 'Challenges',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.',
        isActive: true
      }
    });

    const challengeItems = [
      {
        challengeId: 1,
        number: '01',
        title: 'Access Gaps',
        description: 'Millions of patients struggle to access specialist care due to geographical barriers, and limited availability of healthcare professionals in rural areas',
        displayOrder: 1
      },
      {
        challengeId: 1,
        number: '02',
        title: 'Resource Strain',
        description: 'Healthcare facilities are overwhelmed with inefficient scheduling systems, and staff shortages, leading to burnout and compromised patient care quality',
        displayOrder: 2
      },
      {
        challengeId: 1,
        number: '03',
        title: 'Data Silos',
        description: 'Patient information remains fragmented across multiple systems, creating incomplete medical histories, duplicate tests, and delayed treatment',
        displayOrder: 3
      }
    ];

    for (const item of challengeItems) {
      await HomeChallengeItem.findOrCreate({
        where: { challengeId: item.challengeId, number: item.number },
        defaults: item
      });
    }

    // 4. Ecosystem Section
    const ecosystemSection = await HomeEcosystem.findOrCreate({
      where: { id: 1 },
      defaults: {
        sectionTitle: 'End-to-End',
        sectionHighlight: 'Telemedicine Ecosystem',
        description: 'From connected monitoring devices to a secure patient-data platform and on-demand clinical support, Carebridge Technologies delivers everything you need to scale remote care—seamlessly',
        isActive: true
      }
    });

    const ecosystemItems = [
      {
        ecosystemId: 1,
        title: 'Platforms',
        description: 'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis.',
        image: '/images/desktop-mockup.svg',
        link: '/platforms',
        type: 'large',
        displayOrder: 1
      },
      {
        ecosystemId: 1,
        title: 'Devices',
        description: 'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper.',
        image: '/images/bundle.svg',
        link: '/devices',
        type: 'small',
        displayOrder: 2
      },
      {
        ecosystemId: 1,
        title: 'Services',
        description: 'Lorem ipsum dolor sit amet consecte tur adipiscing elit semper.',
        image: '/images/mobile-mockup.svg',
        link: '/services',
        type: 'small',
        displayOrder: 3
      }
    ];

    for (const item of ecosystemItems) {
      await HomeEcosystemItem.findOrCreate({
        where: { ecosystemId: item.ecosystemId, title: item.title },
        defaults: item
      });
    }

    // 5. Target Audience Section
    const audienceSection = await HomeTargetAudience.findOrCreate({
      where: { id: 1 },
      defaults: {
        sectionTitle: 'Who We',
        sectionHighlight: 'Serve',
        description: 'Carebridge Technologies empowers diverse healthcare providers—from clinics and hospitals to PHCs, NGOs, and home care services—with scalable telemedicine solutions tailored to their unique needs.',
        isActive: true
      }
    });

    const audienceTabs = [
      {
        audienceId: 1,
        tabId: 'clinics',
        title: 'Clinics',
        image: '/images/benyamin.png',
        description: 'Improved patient management to grow patient capacity and virtual visits',
        displayOrder: 1
      },
      {
        audienceId: 1,
        tabId: 'hospitals',
        title: 'Hospitals',
        image: '/images/benyamin.png',
        description: 'Better hospital workflows, patient record integration, and digital OPD.',
        displayOrder: 2
      },
      {
        audienceId: 1,
        tabId: 'phc',
        title: 'PHC',
        image: '/images/benyamin.png',
        description: 'Streamlined PHC management and rural health support with telemedicine.',
        displayOrder: 3
      },
      {
        audienceId: 1,
        tabId: 'ngo',
        title: 'NGO & Health Camps',
        image: '/images/benyamin.png',
        description: 'NGOs can manage health camps, patient registration, and follow-ups.',
        displayOrder: 4
      },
      {
        audienceId: 1,
        tabId: 'home',
        title: 'Home Care',
        image: '/images/benyamin.png',
        description: 'Enable home care visits, track vitals, and connect patients to doctors virtually.',
        displayOrder: 5
      }
    ];

    for (const tab of audienceTabs) {
      await HomeTargetAudienceTab.findOrCreate({
        where: { audienceId: tab.audienceId, tabId: tab.tabId },
        defaults: tab
      });
    }

    // 6. Company Logos Section
    const logosSection = await HomeCompanyLogos.findOrCreate({
      where: { id: 1 },
      defaults: {
        sectionTitle: 'Trusted by',
        sectionSubtitle: '10,000+ companies around the world',
        isActive: true
      }
    });

    const logoItems = [
      { logoSectionId: 1, companyName: 'Google', logoImage: '/images/Google.png', displayOrder: 1 },
      { logoSectionId: 1, companyName: 'Facebook', logoImage: '/images/facebook-gray.png', displayOrder: 2 },
      { logoSectionId: 1, companyName: 'YouTube', logoImage: '/images/YouTube.png', displayOrder: 3 },
      { logoSectionId: 1, companyName: 'Pinterest', logoImage: '/images/Pinterest.png', displayOrder: 4 },
      { logoSectionId: 1, companyName: 'Twitch', logoImage: '/images/Twitch.png', displayOrder: 5 },
      { logoSectionId: 1, companyName: 'Webflow', logoImage: '/images/Webflow.png', displayOrder: 6 }
    ];

    for (const logo of logoItems) {
      await HomeCompanyLogoItem.findOrCreate({
        where: { logoSectionId: logo.logoSectionId, companyName: logo.companyName },
        defaults: logo
      });
    }

    // 7. Testimonials Section
    const testimonialsSection = await HomeTestimonials.findOrCreate({
      where: { id: 1 },
      defaults: {
        sectionTitle: 'What our',
        sectionHighlight: 'Clients say',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.',
        isActive: true
      }
    });

    const testimonialItems = [
      {
        testimonialSectionId: 1,
        profileImage: '/images/profile.svg',
        title: 'An amazing service',
        description: 'Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.',
        name: 'John Carter',
        position: 'Designer at BRIX Templates',
        displayOrder: 1
      },
      {
        testimonialSectionId: 1,
        profileImage: '/images/profile.svg',
        title: 'One of a kind service',
        description: 'Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.',
        name: 'Sophie Moore',
        position: 'Head of Design at BRIX Templates',
        displayOrder: 2
      },
      {
        testimonialSectionId: 1,
        profileImage: '/images/profile.svg',
        title: 'The best service',
        description: 'Convallis posuere morbi leo urna molestie at elementum eu facilisis sapien pellentesque habitant.',
        name: 'Andy Smith',
        position: 'Developer at BRIX Templates',
        displayOrder: 3
      }
    ];

    for (const item of testimonialItems) {
      await HomeTestimonialItem.findOrCreate({
        where: { testimonialSectionId: item.testimonialSectionId, name: item.name },
        defaults: item
      });
    }

    // 8. CTA Section
    const cta = await HomeCTA.findOrCreate({
      where: { id: 1 },
      defaults: {
        title: 'Create your account today and get started for free!',
        buttonText: 'Get in Touch',
        buttonLink: '/contact-us',
        image: '/images/home-image.svg',
        isActive: true
      }
    });

    console.log('✅ Seed data inserted successfully');
    console.log('\n📊 Home Page Summary:');
    console.log('  - Hero section: Created');
    console.log('  - Features: 4 features added');
    console.log('  - Challenges: 3 items added');
    console.log('  - Ecosystem: 3 items added');
    console.log('  - Target Audience: 5 tabs added');
    console.log('  - Company Logos: 6 logos added');
    console.log('  - Testimonials: 3 testimonials added');
    console.log('  - CTA section: Created');
    console.log('\n✅ Home page setup complete!');
    console.log('🌐 API available at: GET /api/pages/home');

  } catch (error) {
    console.error('❌ Error creating home tables:', error);
    throw error;
  }
}

module.exports = createHomeTables;

// Run if called directly
if (require.main === module) {
  createHomeTables()
    .then(() => {
      console.log('\n✅ Migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Migration failed:', error);
      process.exit(1);
    });
}
