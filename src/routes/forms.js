const express = require('express');
const { body, validationResult } = require('express-validator');
const { FormSubmission } = require('../models');
const router = express.Router();

// POST /api/forms/contact - Submit contact form
router.post('/contact', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, company, message } = req.body;

    const submission = await FormSubmission.create({
      formType: 'contact',
      name,
      email,
      phone: phone || null,
      company: company || null,
      message
    });

    res.status(201).json({ 
      message: 'Form submitted successfully',
      submissionId: submission.id
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ 
      error: 'Failed to submit contact form',
      message: error.message 
    });
  }
});

// POST /api/forms/about - Submit about page form
router.post('/about', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, company, message } = req.body;

    const submission = await FormSubmission.create({
      formType: 'about',
      name,
      email,
      phone: phone || null,
      company: company || null,
      message
    });

    res.status(201).json({ 
      message: 'Form submitted successfully',
      submissionId: submission.id
    });
  } catch (error) {
    console.error('Error submitting about form:', error);
    res.status(500).json({ 
      error: 'Failed to submit about form',
      message: error.message 
    });
  }
});

module.exports = router;
