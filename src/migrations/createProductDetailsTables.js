const { sequelize } = require('../models');
const {
  ProductPlatform,
  PlatformFeature,
  PlatformImage,
  ProductContentSection,
  ProductAchievement,
  ProductTargetAudience,
  ProductDeploymentOption,
  DeploymentPlatformMapping,
  ProductSolution,
  ProductCTASection
} = require('../models');

async function createProductDetailsTables() {
  try {
    console.log('🔄 Starting Product Details database migration...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Drop ALL Product Details tables to ensure clean recreation with correct schema
    console.log('🔄 Dropping all Product Details tables...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.query('DROP TABLE IF EXISTS `deployment_platform_mapping`');
    await sequelize.query('DROP TABLE IF EXISTS `product_solutions`');
    await sequelize.query('DROP TABLE IF EXISTS `product_cta_sections`');
    await sequelize.query('DROP TABLE IF EXISTS `platform_features`');
    await sequelize.query('DROP TABLE IF EXISTS `platform_images`');
    await sequelize.query('DROP TABLE IF EXISTS `product_deployment_options`');
    await sequelize.query('DROP TABLE IF EXISTS `product_target_audiences`');
    await sequelize.query('DROP TABLE IF EXISTS `product_achievements`');
    await sequelize.query('DROP TABLE IF EXISTS `product_content_sections`');
    await sequelize.query('DROP TABLE IF EXISTS `product_platforms`');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    
    // Create tables with correct schema
    console.log('🔄 Creating Product Details tables with correct schema...');
    await ProductPlatform.sync({ force: false });
    await PlatformFeature.sync({ force: false });
    await PlatformImage.sync({ force: false });
    await ProductContentSection.sync({ force: false });
    await ProductAchievement.sync({ force: false });
    await ProductTargetAudience.sync({ force: false });
    await ProductDeploymentOption.sync({ force: false });
    await DeploymentPlatformMapping.sync({ force: false });
    await ProductSolution.sync({ force: false });
    await ProductCTASection.sync({ force: false });
    console.log('✅ Product Details tables created successfully.');

    // Seed initial data
    await seedProductDetailsData();

    console.log('🎉 Product Details migration completed successfully!');
  } catch (error) {
    console.error('❌ Product Details migration failed:', error);
    process.exit(1);
  }
}

async function seedProductDetailsData() {
  console.log('🌱 Seeding Product Details data...');
  
  try {
    // 1. Seed Product Platforms
    const platforms = [
      {
        platformId: 'Consensus',
        name: 'Consensus',
        logoUrl: '/images/consensus.png',
        description: 'Secure telemedicine and tele-consulting platform that enables healthcare providers to deliver quality care anytime, anywhere. It bridges the gap between patients and doctors through real-time video consultations, medical data sharing, and collaborative treatment planning.',
        displayOrder: 1,
        isActive: true
      },
      {
        platformId: 'CoddleOnline',
        name: 'CoddleOnline',
        logoUrl: '/images/coddle-logo.png',
        description: 'Every 10 minutes in India, a mother dies from pregnancy-related complications—most of them preventable. With 30M pregnancies annually and 59% classified as high-risk, there is an urgent need for continuous monitoring, timely interventions, and better doctor-patient connectivity. Coddle Online, is a cloud-based maternal health platform designed to reduce maternal mortality by connecting patients, doctors, and health workers on a single digital ecosystem. It provides real-time monitoring, electronic health records (EHR), and teleconsultations, ensuring safer outcomes for mothers and newborns.',
        displayOrder: 2,
        isActive: true
      },
      {
        platformId: 'Rhythms24x7',
        name: 'Rhythms24x7',
        logoUrl: '/images/rhythams.png',
        description: 'Rhythms24x7 is a cutting-edge web-based tele-cardiology platform designed for real-time sharing of vital cardiac parameters and remote management of cardiac emergencies. Our ultra-compact device paired with a secure cloud-based data hub revolutionizes how cardiac data is captured, shared, and managed, facilitating early diagnosis and enhancing healthcare provider and patient experience. With seamless integration to hospitals and ambulances, Rhythms24x7 ensures critical patients receive urgent treatment within the golden hour.',
        displayOrder: 3,
        isActive: true
      }
    ];

    for (const platform of platforms) {
      await ProductPlatform.findOrCreate({
        where: { platformId: platform.platformId },
        defaults: platform
      });
    }
    console.log('✅ Platforms seeded');

    // 2. Seed Platform Features (only for Consensus as per sample data)
    const features = [
      {
        platformId: 'Consensus',
        iconUrl: '/images/displayNo.png',
        title: 'ABDM Certified Software',
        description: 'Enabling seamless integration with India\'s NDHM ecosystem for secure, interoperable patient data'
      }
    ];

    for (const feature of features) {
      await PlatformFeature.findOrCreate({
        where: { platformId: feature.platformId },
        defaults: feature
      });
    }
    console.log('✅ Platform features seeded');

    // 3. Seed Platform Images (6 placeholder images per platform)
    const platformImages = [];
    ['Consensus', 'CoddleOnline', 'Rhythms24x7'].forEach(platformId => {
      for (let i = 1; i <= 6; i++) {
        platformImages.push({
          platformId,
          imageUrl: '/images/ImagePlaceholder.png',
          displayOrder: i,
          altText: `${platformId} screenshot ${i}`
        });
      }
    });

    for (const image of platformImages) {
      await PlatformImage.findOrCreate({
        where: { 
          platformId: image.platformId,
          displayOrder: image.displayOrder
        },
        defaults: image
      });
    }
    console.log('✅ Platform images seeded');

    // 4. Seed Content Sections
    const sections = [
      {
        sectionKey: 'how_it_works',
        titleMain: 'HOW IT',
        titleHighlight: 'WORKS',
        imageUrl: '/images/work.svg',
        isActive: true
      },
      {
        sectionKey: 'achieve',
        titleMain: 'WHAT YOU',
        titleHighlight: 'achieve',
        isActive: true
      },
      {
        sectionKey: 'target_audience',
        titleMain: 'who is it',
        titleHighlight: 'for',
        isActive: true
      },
      {
        sectionKey: 'deployment',
        titleMain: 'Flexible Deployment,',
        titleHighlight: 'Maximum Impact',
        isActive: true
      },
      {
        sectionKey: 'solutions',
        titleMain: 'Key',
        titleHighlight: 'Solutions',
        isActive: true
      }
    ];

    for (const section of sections) {
      await ProductContentSection.findOrCreate({
        where: { sectionKey: section.sectionKey },
        defaults: section
      });
    }
    console.log('✅ Content sections seeded');

    // 5. Seed Achievements
    const achievements = [
      {
        iconUrl: '/images/reach-remote.svg',
        title: 'Reach Remote Communities',
        description: 'Deliver quality healthcare to rural and underserved areas through teleconsultations and remote diagnostics',
        displayOrder: 1,
        isActive: true
      },
      {
        iconUrl: '/images/cut-travel.svg',
        title: 'Cut Travel & Wait Times',
        description: 'Connect patients with doctors instantly, eliminating long commutes and clinic queues',
        displayOrder: 2,
        isActive: true
      },
      {
        iconUrl: '/images/enable-expert.svg',
        title: 'Enable Expert Collaboration',
        description: 'Bring multiple specialists together virtually for faster, better clinical decisions',
        displayOrder: 3,
        isActive: true
      },
      {
        iconUrl: '/images/manage-health.svg',
        title: 'Manage Health Proactively',
        description: 'Support chronic disease management and preventive care with continuous remote monitoring',
        displayOrder: 4,
        isActive: true
      }
    ];

    for (const achievement of achievements) {
      await ProductAchievement.findOrCreate({
        where: { title: achievement.title },
        defaults: achievement
      });
    }
    console.log('✅ Achievements seeded');

    // 6. Seed Target Audiences
    const targetAudiences = [
      {
        imageUrl: '/images/ImagePlaceholder.png',
        title: 'Primary Health Centres',
        description: 'Lorem ipsum dolor sit amet consecte turole adipiscing elit semper dalaracc lacus velolte facilisis volutpat est velitolm.',
        displayOrder: 1,
        isActive: true
      },
      {
        imageUrl: '/images/ImagePlaceholder.png',
        title: 'Hospitals & Clinics',
        description: 'All patient data in one place to facilitate faster and coordinated patient care',
        displayOrder: 2,
        isActive: true
      },
      {
        imageUrl: '/images/ImagePlaceholder.png',
        title: 'Home Care',
        description: 'Provide virtual check-ups, remote monitoring, and personalized chronic care without clinic visits',
        displayOrder: 3,
        isActive: true
      }
    ];

    for (const audience of targetAudiences) {
      await ProductTargetAudience.findOrCreate({
        where: { title: audience.title },
        defaults: audience
      });
    }
    console.log('✅ Target audiences seeded');

    // 7. Seed Deployment Options
    const deploymentOptions = [
      {
        iconUrl: '/images/bundle.svg',
        title: 'Bundled with CareNest Kiosks',
        displayOrder: 1,
        isActive: true
      },
      {
        iconUrl: '/images/standalone.svg',
        title: 'Standalone Software as a Service',
        displayOrder: 2,
        isActive: true
      },
      {
        iconUrl: '/images/ImagePlaceholder.png',
        title: 'Multiple Device Integration',
        displayOrder: 3,
        isActive: true
      },
      {
        iconUrl: '/images/portable.svg',
        title: 'Portable Health Monitoring',
        displayOrder: 4,
        isActive: true
      }
    ];

    const deploymentIds = [];
    for (const option of deploymentOptions) {
      const [deployment] = await ProductDeploymentOption.findOrCreate({
        where: { title: option.title },
        defaults: option
      });
      deploymentIds.push(deployment.id);
    }
    console.log('✅ Deployment options seeded');

    // 8. Seed Deployment Platform Mappings (all apply to Consensus and Rhythms24x7)
    const mappings = [];
    deploymentIds.forEach(deploymentId => {
      mappings.push(
        { deploymentOptionId: deploymentId, platformId: 'Consensus' },
        { deploymentOptionId: deploymentId, platformId: 'Rhythms24x7' }
      );
    });

    for (const mapping of mappings) {
      await DeploymentPlatformMapping.findOrCreate({
        where: {
          deploymentOptionId: mapping.deploymentOptionId,
          platformId: mapping.platformId
        },
        defaults: mapping
      });
    }
    console.log('✅ Deployment platform mappings seeded');

    // 9. Seed Solutions (for CoddleOnline)
    const solutions = [
      {
        platformId: 'CoddleOnline',
        imageUrl: '/images/ImagePlaceholder.png',
        title: 'Mobile app',
        description: 'Track maternal vitals and fetal health remotely',
        displayOrder: 1,
        isActive: true
      },
      {
        platformId: 'CoddleOnline',
        imageUrl: '/images/ImagePlaceholder.png',
        title: 'Web app',
        description: 'Secure virtual care with complete patient history',
        displayOrder: 2,
        isActive: true
      },
      {
        platformId: 'CoddleOnline',
        imageUrl: '/images/ImagePlaceholder.png',
        title: 'Intrapartum App',
        description: 'Monitor up to 8 patients simultaneously during',
        displayOrder: 3,
        isActive: true
      },
      {
        platformId: 'CoddleOnline',
        imageUrl: '/images/ImagePlaceholder.png',
        title: 'Portable Kit',
        description: 'Provide high-risk patients with at-home monitoring tools',
        displayOrder: 4,
        isActive: true
      }
    ];

    for (const solution of solutions) {
      await ProductSolution.findOrCreate({
        where: { 
          platformId: solution.platformId,
          title: solution.title
        },
        defaults: solution
      });
    }
    console.log('✅ Solutions seeded');

    // 10. Seed CTA Sections
    const ctaSections = [
      {
        platformId: 'Consensus',
        title: 'Curious About How Consensus Could Work for You?',
        description: 'Whether you\'re exploring telemedicine for the first time or looking to upgrade your current setup, we\'ll walk you through how Consensus can fit into your care delivery model',
        buttonText: 'Get in Touch',
        buttonLink: '/contact-us'
      },
      {
        platformId: 'CoddleOnline',
        title: 'Transform Fetal & Maternal Health with Coddle Online',
        description: 'Take technology to the communities that need it most—empowering doctors, nurses, and mothers with safer, smarter pregnancy care.',
        buttonText: 'Get in Touch',
        buttonLink: '/contact-us'
      },
      {
        platformId: 'Rhythms24x7',
        title: 'Ready to Transform Cardiac Care?',
        description: 'Join the revolution in cardiac emergency management with Rhythms24x7. Experience real-time monitoring, instant data sharing, and life-saving rapid response capabilities.',
        buttonText: 'Get in Touch',
        buttonLink: '/contact-us'
      }
    ];

    for (const cta of ctaSections) {
      await ProductCTASection.findOrCreate({
        where: { platformId: cta.platformId },
        defaults: cta
      });
    }
    console.log('✅ CTA sections seeded');

    console.log('🎉 All Product Details seed data inserted successfully!');
  } catch (error) {
    console.error('❌ Error seeding Product Details data:', error);
    throw error;
  }
}

// Run migration if called directly
if (require.main === module) {
  createProductDetailsTables()
    .then(() => {
      console.log('✅ Migration script completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { createProductDetailsTables, seedProductDetailsData };
