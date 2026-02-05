const express = require('express');
const router = express.Router();
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

// GET /api/product-details - Get all product details content
// GET /api/product-details - Get all product details content clustered by platform
router.get('/', async (req, res) => {
  try {
    const uploadUrl = process.env.UPLOAD_URL || 'http://localhost:3000';

    // Helper function to add upload URL to image paths
    const addUploadUrl = (path) => {
      if (!path) return path;
      return path.startsWith('http') ? path : `${uploadUrl}${path}`;
    };

    // Fetch all data in parallel
    const [
      platforms,
      sections,
      achievements,
      targetAudiences,
      deploymentOptions,
      solutions,
      ctaSections,
      allFeatures,
      allImages
    ] = await Promise.all([
      ProductPlatform.findAll({ where: { isActive: true }, order: [['displayOrder', 'ASC']] }),
      ProductContentSection.findAll({ where: { isActive: true } }),
      ProductAchievement.findAll({ where: { isActive: true }, order: [['displayOrder', 'ASC']] }),
      ProductTargetAudience.findAll({ where: { isActive: true }, order: [['displayOrder', 'ASC']] }),
      ProductDeploymentOption.findAll({ where: { isActive: true }, order: [['displayOrder', 'ASC']] }),
      ProductSolution.findAll({ where: { isActive: true }, order: [['displayOrder', 'ASC']] }),
      ProductCTASection.findAll(),
      PlatformFeature.findAll(),
      PlatformImage.findAll({ order: [['displayOrder', 'ASC']] })
    ]);

    // Build platform-centric structure
    const platformsData = platforms.map(platform => {
      const pid = platform.platformId;

      // Filter data for this platform
      const pFeature = allFeatures.find(f => f.platformId === pid);
      const pImages = allImages.filter(img => img.platformId === pid);
      const pSolutions = solutions.filter(s => s.platformId === pid);
      const pCta = ctaSections.find(c => c.platformId === pid);
      const pSections = sections.filter(s => s.platformId === pid);
      const pAchievements = achievements.filter(a => a.platformId === pid);
      const pAudiences = targetAudiences.filter(a => a.platformId === pid);
      const pDeployments = deploymentOptions.filter(d => d.platformId === pid);

      // Format sections as object keyed by sectionKey
      const sectionsObj = {};
      pSections.forEach(section => {
        const key = section.sectionKey.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        sectionsObj[key] = {
          title: {
            main: section.titleMain,
            highlight: section.titleHighlight
          }
        };
        if (section.imageUrl) sectionsObj[key].image = addUploadUrl(section.imageUrl);
        if (section.description) sectionsObj[key].description = section.description;
      });

      return {
        id: platform.platformId,
        name: platform.name,
        logo: addUploadUrl(platform.logoUrl),
        description: platform.description,
        feature: pFeature ? {
            icon: addUploadUrl(pFeature.iconUrl),
            title: pFeature.title,
            description: pFeature.description
        } : null,
        images: pImages.map(img => addUploadUrl(img.imageUrl)),
        solutions: pSolutions.map(s => ({
            id: s.id,
            image: addUploadUrl(s.imageUrl),
            title: s.title,
            description: s.description
        })),
        cta: pCta ? {
            title: pCta.title,
            description: pCta.description,
            buttonText: pCta.buttonText,
            buttonLink: pCta.buttonLink
        } : null,
        // NEW NESTED DATA
        sections: sectionsObj,
        achievements: pAchievements.map(a => ({
            id: a.id,
            icon: addUploadUrl(a.iconUrl),
            title: a.title,
            description: a.description
        })),
        targetAudiences: pAudiences.map(a => ({
            id: a.id,
            image: addUploadUrl(a.imageUrl),
            title: a.title,
            description: a.description
        })),
        deploymentOptions: pDeployments.map(d => ({
            id: d.id,
            icon: addUploadUrl(d.iconUrl),
            title: d.title
        }))
      };
    });

    res.json({
      success: true,
      data: {
        platforms: platformsData
      }
    });

  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product details',
      error: error.message
    });
  }
});

// GET /api/product-details/:platformId - Get single platform details
router.get('/:platformId', async (req, res) => {
  try {
    const { platformId } = req.params;
    const uploadUrl = process.env.UPLOAD_URL || 'http://localhost:3000';

    // Fetch platform
    const platform = await ProductPlatform.findOne({
      where: { platformId, isActive: true }
    });

    if (!platform) {
      return res.status(404).json({
        success: false,
        message: 'Platform not found'
      });
    }

    // Fetch platform details
    const [feature, images, solutions, cta, sections, achievements, targetAudiences, deploymentOptions] = await Promise.all([
      PlatformFeature.findOne({ where: { platformId } }),
      PlatformImage.findAll({ where: { platformId }, order: [['displayOrder', 'ASC']] }),
      ProductSolution.findAll({ where: { platformId, isActive: true }, order: [['displayOrder', 'ASC']] }),
      ProductCTASection.findOne({ where: { platformId } }),
      ProductContentSection.findAll({ where: { platformId, isActive: true } }),
      ProductAchievement.findAll({ where: { platformId, isActive: true }, order: [['displayOrder', 'ASC']] }),
      ProductTargetAudience.findAll({ where: { platformId, isActive: true }, order: [['displayOrder', 'ASC']] }),
      ProductDeploymentOption.findAll({ where: { platformId, isActive: true }, order: [['displayOrder', 'ASC']] })
    ]);

    // Helper function to add upload URL
    const addUploadUrl = (path) => {
      if (!path) return path;
      return path.startsWith('http') ? path : `${uploadUrl}${path}`;
    };

    // Process sections into keyed object
    const sectionsData = {};
    sections.forEach(section => {
      const key = section.sectionKey.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      sectionsData[key] = {
        title: {
          main: section.titleMain,
          highlight: section.titleHighlight
        }
      };
      if (section.imageUrl) sectionsData[key].image = addUploadUrl(section.imageUrl);
      if (section.description) sectionsData[key].description = section.description;
    });

    // Build response
    const response = {
      success: true,
      data: {
        id: platform.platformId,
        name: platform.name,
        logo: addUploadUrl(platform.logoUrl),
        description: platform.description,
        feature: feature ? {
          icon: addUploadUrl(feature.iconUrl),
          title: feature.title,
          description: feature.description
        } : null,
        images: images.map(img => addUploadUrl(img.imageUrl)),
        solutions: solutions.map(solution => ({
          id: solution.id,
          image: addUploadUrl(solution.imageUrl),
          title: solution.title,
          description: solution.description
        })),
        cta: cta ? {
          title: cta.title,
          description: cta.description,
          buttonText: cta.buttonText,
          buttonLink: cta.buttonLink
        } : null,
        sections: sectionsData,
        achievements: achievements.map(a => ({
          id: a.id,
          icon: addUploadUrl(a.iconUrl),
          title: a.title,
          description: a.description
        })),
        targetAudiences: targetAudiences.map(a => ({
          id: a.id,
          image: addUploadUrl(a.imageUrl),
          title: a.title,
          description: a.description
        })),
        deploymentOptions: deploymentOptions.map(d => ({
          id: d.id,
          icon: addUploadUrl(d.iconUrl),
          title: d.title
        }))
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching platform details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch platform details',
      error: error.message
    });
  }
});

module.exports = router;
