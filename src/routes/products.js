const express = require('express');
const { Product } = require('../models');
const router = express.Router();

// GET /api/products/:category - Get products by category
router.get('/category', async (req, res) => {
  try {
    const { category } = req.params;

    const categoryProducts = await Product.findAll({
      where: {
        status: 'active'
      },
      order: [['displayOrder', 'ASC'], ['productName', 'ASC']],
      group: ['categoryKey']
    });

    res.json({
      category: categoryProducts
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({
      error: 'Failed to fetch products by category',
      message: error.message
    });
  }
});

// GET /api/products - Get all products grouped by category
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { status: 'active' },
      order: [['categoryKey', 'ASC'], ['displayOrder', 'ASC']]
    });

    const groupedProducts = {};

    products.forEach(({
      id,
      categoryKey,
      productName,
      specifications,
      mainImage,
      galleryImages,
      brochureUrl
    }) => {
      if (!groupedProducts[categoryKey]) {
        groupedProducts[categoryKey] = [];
      }

      const uploadUrl = process.env.UPLOAD_URL;

      // 🔹 Normalize specifications
      let normalizedSpecifications = [];
      if (Array.isArray(specifications)) {
        normalizedSpecifications = specifications;
      } else if (typeof specifications === 'string') {
        try {
          const parsed = JSON.parse(specifications);
          if (Array.isArray(parsed)) {
            normalizedSpecifications = parsed;
          } else {
            normalizedSpecifications = specifications
              .split(/\r?\n|,/g) // Split by line breaks or commas
              .map(s => s.trim())
              .filter(Boolean);
          }
        } catch {
          normalizedSpecifications = specifications
            .split(/\r?\n|,/g)
            .map(s => s.trim())
            .filter(Boolean);
        }
      } else if (typeof specifications === 'object' && specifications !== null) {
        normalizedSpecifications = Object.values(specifications);
      }

      // 🔹 Normalize gallery images
      let normalizedGallery = [];
      if (Array.isArray(galleryImages)) {
        normalizedGallery = galleryImages;
      } else if (typeof galleryImages === 'string') {
        try {
          const parsed = JSON.parse(galleryImages);
          if (Array.isArray(parsed)) {
            normalizedGallery = parsed;
          } else {
            normalizedGallery = galleryImages
              .split(/\r?\n|(?<=\.png|\.jpg|\.jpeg|\.webp)(?=\/uploads)/gi)
              .map(s => s.trim())
              .filter(Boolean);
          }
        } catch {
          normalizedGallery = galleryImages
            .split(/\r?\n|(?<=\.png|\.jpg|\.jpeg|\.webp)(?=\/uploads)/gi)
            .map(s => s.trim())
            .filter(Boolean);
        }
      } else if (typeof galleryImages === 'object' && galleryImages !== null) {
        normalizedGallery = Object.values(galleryImages);
      }

      // 🔹 Push final product entry
      groupedProducts[categoryKey].push({
        id,
        productName,
        specifications: normalizedSpecifications,
        mainImage: mainImage ? `${uploadUrl}${mainImage}` : null,
        galleryImages: normalizedGallery.map(img => `${uploadUrl}${img}`),
        brochureUrl
      });
    });

    res.json({
      productsByCategory: groupedProducts
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      error: 'Failed to fetch products',
      message: error.message
    });
  }
});

module.exports = router;
