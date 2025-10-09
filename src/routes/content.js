const express = require('express');
const { ContentItem } = require('../models');
const router = express.Router();

// GET /api/content/:pageKey - Get all content for a page
router.get('/:pageKey', async (req, res) => {
  try {
    const { pageKey } = req.params;
    const uploadUrl = process.env.UPLOAD_URL || 'http://localhost:3000';
    
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
      
      // For image content types, return full URL with base domain
      if (item.contentType === 'image') {
        groupedContent[item.sectionKey][item.contentKey] = `${item.contentValue}`;
      } else {
        groupedContent[item.sectionKey][item.contentKey] = item.contentValue;
      }
    });

    res.json({
      pageKey,
      content: groupedContent
    });
  } catch (error) {
    console.error('Error fetching page content:', error);
    res.status(500).json({ 
      error: 'Failed to fetch page content',
      message: error.message 
    });
  }
});

// GET /api/content/:pageKey/:sectionKey - Get specific section content
router.get('/:pageKey/:sectionKey', async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;
    const uploadUrl = process.env.UPLOAD_URL || 'http://localhost:3000';
    
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
      // For image content types, return full URL with base domain
      if (item.contentType === 'image') {
        sectionContent[item.contentKey] = `${uploadUrl}${item.contentValue}`;
      } else {
        sectionContent[item.contentKey] = item.contentValue;
      }
    });

    res.json({
      pageKey,
      sectionKey,
      content: sectionContent
    });
  } catch (error) {
    console.error('Error fetching content section:', error);
    res.status(500).json({ 
      error: 'Failed to fetch content section',
      message: error.message 
    });
  }
});

module.exports = router;
