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
router.get('/', async (req, res) => {
  try {
    const uploadUrl = process.env.UPLOAD_URL || 'http://localhost:3000';

    // Fetch all data in parallel
    const [
      platforms,
      sections,
      achievements,
      targetAudiences,
      deploymentOptions,
      solutions,
      ctaSections
    ] = await Promise.all([
      // Platforms with features and images
      ProductPlatform.findAll({
        where: { isActive: true },
        order: [['displayOrder', 'ASC']],
        raw: false
      }),
      // Content sections
      ProductContentSection.findAll({
        where: { isActive: true }
      }),
      // Achievements
      ProductAchievement.findAll({
        where: { isActive: true },
        order: [['displayOrder', 'ASC']]
      }),
      // Target Audiences
      ProductTargetAudience.findAll({
        where: { isActive: true },
        order: [['displayOrder', 'ASC']]
      }),
      // Deployment Options
      ProductDeploymentOption.findAll({
        where: { isActive: true },
        order: [['displayOrder', 'ASC']]
      }),
      // Solutions
      ProductSolution.findAll({
        where: { isActive: true },
        order: [['displayOrder', 'ASC']]
      }),
      // CTA Sections
      ProductCTASection.findAll()
    ]);

    // Fetch features and images for each platform
    const platformsWithDetails = await Promise.all(
      platforms.map(async (platform) => {
        const [feature, images] = await Promise.all([
          PlatformFeature.findOne({
            where: { platformId: platform.platformId }
          }),
          PlatformImage.findAll({
            where: { platformId: platform.platformId },
            order: [['displayOrder', 'ASC']]
          })
        ]);

        return {
          platform,
          feature,
          images
        };
      })
    );

    // Fetch deployment mappings
    const deploymentMappings = await DeploymentPlatformMapping.findAll();

    // Helper function to add upload URL to image paths
    const addUploadUrl = (path) => {
      if (!path) return path;
      return path.startsWith('http') ? path : `${uploadUrl}${path}`;
    };

    // Build platforms array
    const platformsData = platformsWithDetails.map(({ platform, feature, images }) => ({
      id: platform.platformId,
      name: platform.name,
      logo: addUploadUrl(platform.logoUrl),
      description: platform.description,
      feature: feature ? {
        icon: addUploadUrl(feature.iconUrl),
        title: feature.title,
        description: feature.description
      } : undefined,
      images: images.map(img => addUploadUrl(img.imageUrl))
    }));

    // Build sections object
    const sectionsData = {};
    sections.forEach(section => {
      const key = section.sectionKey.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      sectionsData[key] = {
        title: {
          main: section.titleMain,
          highlight: section.titleHighlight
        }
      };
      if (section.imageUrl) {
        sectionsData[key].image = addUploadUrl(section.imageUrl);
      }
      if (section.description) {
        sectionsData[key].description = section.description;
      }
    });

    // Build achievements array
    const achievementsData = achievements.map(achievement => ({
      id: achievement.id,
      icon: addUploadUrl(achievement.iconUrl),
      title: achievement.title,
      description: achievement.description
    }));

    // Build target audiences array
    const targetAudiencesData = targetAudiences.map(audience => ({
      id: audience.id,
      image: addUploadUrl(audience.imageUrl),
      title: audience.title,
      description: audience.description
    }));

    // Build deployment options with applicable tabs
    const deploymentOptionsData = deploymentOptions.map(option => {
      const applicableTabs = deploymentMappings
        .filter(mapping => mapping.deploymentOptionId === option.id)
        .map(mapping => mapping.platformId);

      return {
        id: option.id,
        icon: addUploadUrl(option.iconUrl),
        title: option.title,
        applicableTabs
      };
    });

    // Build solutions array
    const solutionsData = solutions.map(solution => ({
      id: solution.id,
      platformId: solution.platformId,
      image: addUploadUrl(solution.imageUrl),
      title: solution.title,
      description: solution.description
    }));

    // Build CTA sections array
    const ctaSectionsData = ctaSections.map(cta => ({
      platformId: cta.platformId,
      title: cta.title,
      description: cta.description,
      buttonText: cta.buttonText,
      buttonLink: cta.buttonLink
    }));

    // Build final response
    const response = {
      success: true,
      data: {
        platforms: platformsData,
        sections: sectionsData,
        achievements: achievementsData,
        targetAudiences: targetAudiencesData,
        deploymentOptions: deploymentOptionsData,
        solutions: solutionsData,
        ctaSections: ctaSectionsData
      }
    };

    res.json(response);
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
    const [feature, images, solutions, cta] = await Promise.all([
      PlatformFeature.findOne({
        where: { platformId }
      }),
      PlatformImage.findAll({
        where: { platformId },
        order: [['displayOrder', 'ASC']]
      }),
      ProductSolution.findAll({
        where: { platformId, isActive: true },
        order: [['displayOrder', 'ASC']]
      }),
      ProductCTASection.findOne({
        where: { platformId }
      })
    ]);

    // Helper function to add upload URL
    const addUploadUrl = (path) => {
      if (!path) return path;
      return path.startsWith('http') ? path : `${uploadUrl}${path}`;
    };

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
        } : null
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
