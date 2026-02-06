const express = require('express');
const router = express.Router();
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
  HomeCTA,
  AboutPageSettings,
  AboutMissionFeature,
  AboutStatistic,
  TeamMember
} = require('../models');

// GET /api/pages/home - Get complete home page content
router.get('/home', async (req, res) => {
  try {
    const uploadUrl = process.env.UPLOAD_URL || 'http://localhost:3000';

    // Fetch all sections in parallel for better performance
    const [
      hero,
      features,
      challengesSection,
      ecosystemSection,
      audienceSection,
      logosSection,
      testimonialsSection,
      cta
    ] = await Promise.all([
      HomeHero.findOne({ where: { isActive: true } }),
      HomeFeatures.findOne({ where: { isActive: true } }),
      HomeChallenges.findOne({ 
        where: { isActive: true },
        include: [{
          model: HomeChallengeItem,
          as: 'items',
          where: { isActive: true },
          required: false,
          order: [['displayOrder', 'ASC']]
        }]
      }),
      HomeEcosystem.findOne({ 
        where: { isActive: true },
        include: [{
          model: HomeEcosystemItem,
          as: 'items',
          where: { isActive: true },
          required: false,
          order: [['displayOrder', 'ASC']]
        }]
      }),
      HomeTargetAudience.findOne({ 
        where: { isActive: true },
        include: [{
          model: HomeTargetAudienceTab,
          as: 'tabs',
          where: { isActive: true },
          required: false,
          order: [['displayOrder', 'ASC']]
        }]
      }),
      HomeCompanyLogos.findOne({ 
        where: { isActive: true },
        include: [{
          model: HomeCompanyLogoItem,
          as: 'logos',
          where: { isActive: true },
          required: false,
          order: [['displayOrder', 'ASC']]
        }]
      }),
      HomeTestimonials.findOne({ 
        where: { isActive: true },
        include: [{
          model: HomeTestimonialItem,
          as: 'items',
          where: { isActive: true },
          required: false,
          order: [['displayOrder', 'ASC']]
        }]
      }),
      HomeCTA.findOne({ where: { isActive: true } })
    ]);

    // Helper function to add upload URL to image paths
    const addUploadUrl = (path) => {
      if (!path) return path;
      return path.startsWith('http') ? path : `${uploadUrl}${path}`;
    };

    // Build response with proper field mapping
    const response = {
      success: true,
      data: {
        hero: hero ? {
          main_title: hero.mainTitle,
          sub_title: hero.subTitle,
          main_text: hero.mainText,
          description: hero.description,
          button_text: hero.buttonText,
          image: addUploadUrl(hero.image)
        } : null,
        
        features: features ? {
          section_title: features.sectionTitle,
          section_subtitle: features.sectionSubtitle,
          feature1_title: features.feature1Title,
          feature2_title: features.feature2Title,
          feature3_title: features.feature3Title,
          feature4_title: features.feature4Title,
          feature1_icon: addUploadUrl(features.feature1Icon),
          feature2_icon: addUploadUrl(features.feature2Icon),
          feature3_icon: addUploadUrl(features.feature3Icon),
          feature4_icon: addUploadUrl(features.feature4Icon)
        } : null,
        
        challenges: challengesSection ? {
          sectionTitle: challengesSection.sectionTitle,
          sectionHighlight: challengesSection.sectionHighlight,
          description: challengesSection.description,
          items: (challengesSection.items || []).map(item => ({
            id: item.id,
            number: item.number,
            title: item.title,
            description: item.description
          }))
        } : null,
        
        ecosystem: ecosystemSection ? {
          sectionTitle: ecosystemSection.sectionTitle,
          sectionHighlight: ecosystemSection.sectionHighlight,
          description: ecosystemSection.description,
          items: (ecosystemSection.items || []).map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            image: addUploadUrl(item.image),
            link: item.link,
            type: item.type
          }))
        } : null,
        
        target_audience: audienceSection ? {
          section_title: audienceSection.sectionTitle,
          section_highlight: audienceSection.sectionHighlight,
          description: audienceSection.description,
          tabs: (audienceSection.tabs || []).map(tab => ({
            id: tab.tabId,
            title: tab.title,
            img: addUploadUrl(tab.image),
            desc: tab.description
          }))
        } : null,
        
        company_logos: logosSection ? {
          section_title: logosSection.sectionTitle,
          section_subtitle: logosSection.sectionSubtitle,
          logos: (logosSection.logos || []).map(logo => ({
            id: logo.id,
            companyName: logo.companyName,
            logoImage: addUploadUrl(logo.logoImage)
          }))
        } : null,
        
        testimonials: testimonialsSection ? {
          sectionTitle: testimonialsSection.sectionTitle,
          sectionHighlight: testimonialsSection.sectionHighlight,
          description: testimonialsSection.description,
          items: (testimonialsSection.items || []).map(item => ({
            id: item.id,
            profileImage: addUploadUrl(item.profileImage),
            title: item.title,
            description: item.description,
            name: item.name,
            position: item.position
          }))
        } : null,
        
        cta: cta ? {
          title: cta.title,
          buttonText: cta.buttonText,
          buttonLink: cta.buttonLink,
          image: addUploadUrl(cta.image)
        } : null
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching home page content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch home page content',
      error: error.message
    });
  }
});

// GET /api/pages/about - Get complete about page content
router.get('/about', async (req, res) => {
  try {
    const uploadUrl = process.env.UPLOAD_URL || 'http://localhost:3000';

    // Fetch all sections in parallel
    const [
      settings,
      missionFeatures,
      statistics,
      teamMembers
    ] = await Promise.all([
      AboutPageSettings.findOne({ where: { isActive: true } }),
      AboutMissionFeature.findAll({ 
        where: { isActive: true },
        order: [['displayOrder', 'ASC']]
      }),
      AboutStatistic.findAll({ 
        where: { isActive: true },
        order: [['displayOrder', 'ASC']]
      }),
      TeamMember.findAll({ 
        where: { status: 'active' },
        order: [['displayOrder', 'ASC']]
      })
    ]);

    // Helper function to add upload URL to image paths
    const addUploadUrl = (path) => {
      if (!path) return path;
      return path.startsWith('http') ? path : `${uploadUrl}${path}`;
    };

    // Build response
    const response = {
      success: true,
      data: {
        header: settings ? {
          title: settings.headerTitle,
          subtitle: settings.headerSubtitle
        } : null,
        
        company: settings ? {
          description: settings.companyDescription,
          image: addUploadUrl(settings.companyImage)
        } : null,
        
        mission: settings ? {
          title: settings.missionTitle,
          highlight: settings.missionHighlight,
          description: settings.missionDescription,
          image: addUploadUrl(settings.missionImage),
          features: missionFeatures.map(feature => ({
            id: feature.id,
            title: feature.title,
            description: feature.description,
            icon: addUploadUrl(feature.icon)
          }))
        } : null,
        
        statistics: settings ? {
          title: settings.statisticsTitle,
          highlight: settings.statisticsHighlight,
          description: settings.statisticsDescription,
          items: statistics.map(stat => ({
            id: stat.id,
            number: stat.number,
            symbol: stat.symbol,
            title: stat.title,
            description: stat.description
          }))
        } : null,
        
        team: settings ? {
          title: settings.teamTitle,
          highlight: settings.teamHighlight,
          description: settings.teamDescription,
          members: teamMembers.map(member => ({
            id: member.id,
            name: member.name,
            position: member.position,
            bio: member.bio,
            profileImage: addUploadUrl(member.profileImage),
            socialLinks: {
              facebook: member.socialFacebook || '',
              twitter: member.socialTwitter || '',
              instagram: member.socialInstagram || '',
              linkedin: member.socialLinkedin || ''
            }
          }))
        } : null,
        
        contact: settings ? {
          title: settings.contactTitle,
          highlight: settings.contactHighlight,
          email: settings.contactEmail,
          phone: settings.contactPhone,
          address: settings.contactAddress
        } : null
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching about page content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch about page content',
      error: error.message
    });
  }
});

module.exports = router;
