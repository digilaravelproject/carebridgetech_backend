const express = require('express');
const { Platform } = require('../models');
const router = express.Router();

// GET /api/platforms - Get all active platforms
router.get('/', async (req, res) => {
  try {
    const platforms = await Platform.findAll({
      where: { status: 'active' },
      order: [['displayOrder', 'ASC'], ['platformName', 'ASC']]
    });

    res.json({
      platforms: platforms.map(platform => ({
        id: platform.id,
        platformName: platform.platformName,
        description: platform.description,
        features: platform.features || [],
        images: platform.images || [],
        platformKey: platform.platformKey,
        technicalSpecs: platform.technicalSpecs || [],
        benefits: platform.benefits || []
      }))
    });
  } catch (error) {
    console.error('Error fetching platforms:', error);
    res.status(500).json({ 
      error: 'Failed to fetch platforms',
      message: error.message 
    });
  }
});

// GET /api/platforms/:platformKey - Get specific platform by key
router.get('/:platformKey', async (req, res) => {
  try {
    const { platformKey } = req.params;
    
    const platform = await Platform.findOne({
      where: { 
        platformKey: platformKey,
        status: 'active' 
      }
    });

    if (!platform) {
      return res.status(404).json({ 
        error: 'Platform not found' 
      });
    }

    res.json({
      platform: {
        id: platform.id,
        platformName: platform.platformName,
        description: platform.description,
        features: platform.features || [],
        images: platform.images || [],
        platformKey: platform.platformKey,
        technicalSpecs: platform.technicalSpecs || [],
        benefits: platform.benefits || [],
        createdAt: platform.createdAt,
        updatedAt: platform.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching platform:', error);
    res.status(500).json({ 
      error: 'Failed to fetch platform',
      message: error.message 
    });
  }
});

// GET /api/platforms/id/:id - Get specific platform by ID
router.get('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const platform = await Platform.findOne({
      where: { 
        id: id,
        status: 'active' 
      }
    });

    if (!platform) {
      return res.status(404).json({ 
        error: 'Platform not found' 
      });
    }

    res.json({
      platform: {
        id: platform.id,
        platformName: platform.platformName,
        description: platform.description,
        features: platform.features || [],
        images: platform.images || [],
        platformKey: platform.platformKey,
        technicalSpecs: platform.technicalSpecs || [],
        benefits: platform.benefits || [],
        createdAt: platform.createdAt,
        updatedAt: platform.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching platform:', error);
    res.status(500).json({ 
      error: 'Failed to fetch platform',
      message: error.message 
    });
  }
});

module.exports = router;
