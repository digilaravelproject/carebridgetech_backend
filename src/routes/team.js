const express = require('express');
const { TeamMember } = require('../models');
const router = express.Router();

// GET /api/team - Get all active team members
router.get('/', async (req, res) => {
  try {
    const teamMembers = await TeamMember.findAll({
      where: { status: 'active' },
      order: [['displayOrder', 'ASC'], ['name', 'ASC']]
    });

    const formattedMembers = teamMembers.map(member => ({
      id: member.id,
      name: member.name,
      position: member.position,
      bio: member.bio,
      profileImage: member.profileImage,
      socialLinks: {
        facebook: member.socialFacebook,
        twitter: member.socialTwitter,
        instagram: member.socialInstagram,
        linkedin: member.socialLinkedin
      }
    }));

    res.json({
      teamMembers: formattedMembers
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ 
      error: 'Failed to fetch team members',
      message: error.message 
    });
  }
});

module.exports = router;
