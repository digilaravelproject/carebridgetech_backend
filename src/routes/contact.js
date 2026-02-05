const express = require('express');
const router = express.Router();
const { ContactDetails } = require('../models');

// Get all contact details
router.get('/', async (req, res) => {
  try {
    const contactDetails = await ContactDetails.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']]
    });
    res.json(contactDetails);
  } catch (error) {
    console.error('Error fetching contact details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
