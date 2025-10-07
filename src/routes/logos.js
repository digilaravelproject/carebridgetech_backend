const express = require('express');
const { CompanyLogo } = require('../models');
const router = express.Router();

// GET /api/logos - Get all active company logos
router.get('/', async (req, res) => {
  try {
    const logos = await CompanyLogo.findAll({
      where: { status: 'active' },
      order: [['displayOrder', 'ASC'], ['companyName', 'ASC']]
    });

    res.json({
      companyLogos: logos.map(logo => ({
        id: logo.id,
        companyName: logo.companyName,
        logoImage: `${process.env.UPLOAD_URL}${logo.logoImage}`
      }))
    });
  } catch (error) {
    console.error('Error fetching company logos:', error);
    res.status(500).json({ 
      error: 'Failed to fetch company logos',
      message: error.message 
    });
  }
});

module.exports = router;
