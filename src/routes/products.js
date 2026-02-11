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
    const uploadUrl = process.env.UPLOAD_URL || '';

    // Fetch Categories with their Products
    const categories = await require('../models').ProductCategory.findAll({
      where: { isActive: true },
      order: [
        ['displayOrder', 'ASC'],
        [{ model: Product, as: 'Products' }, 'displayOrder', 'ASC']
      ],
      include: [{
        model: Product,
        as: 'Products',
        where: { status: 'active' },
        required: false // Include categories even if they have no active products (optional, change to true if only non-empty needed)
      }]
    });

    const formattedCategories = categories.map(category => {
      const products = category.Products.map(product => {
        // 🔹 Normalize specifications
        let normalizedSpecifications = [];
        const { specifications, galleryImages, mainImage } = product;
        
        if (Array.isArray(specifications)) {
          normalizedSpecifications = specifications;
        } else if (typeof specifications === 'string') {
          try {
            const parsed = JSON.parse(specifications);
            if (Array.isArray(parsed)) normalizedSpecifications = parsed;
            else normalizedSpecifications = specifications.split(/\r?\n|,/g).map(s => s.trim()).filter(Boolean);
          } catch {
            normalizedSpecifications = specifications.split(/\r?\n|,/g).map(s => s.trim()).filter(Boolean);
          }
        }

        // 🔹 Normalize gallery images
        let normalizedGallery = [];
        const parseStringList = (str) => {
          if (!str) return [];
          return str.split(/\\r\\n|\\n|\\r|\r\n|\n|\r|,/)
            .map(s => s.trim())
            .map(s => s.replace(/^["']|["']$/g, ''))
            .filter(s => s.length > 0 && !['[', ']'].includes(s));
        };

        if (Array.isArray(galleryImages)) {
          normalizedGallery = galleryImages;
        } else if (typeof galleryImages === 'string') {
          try {
            const parsed = JSON.parse(galleryImages);
            if (Array.isArray(parsed)) normalizedGallery = parsed;
            else if (typeof parsed === 'string') normalizedGallery = parseStringList(parsed);
            else normalizedGallery = [];
          } catch (e) {
            normalizedGallery = parseStringList(galleryImages);
          }
        }

        return {
          id: product.id,
          productName: product.productName,
          specifications: normalizedSpecifications,
          mainImage: mainImage ? (mainImage.startsWith('http') ? mainImage : `${uploadUrl}${mainImage}`) : null,
          galleryImages: normalizedGallery.map(img => img.startsWith('http') ? img : `${uploadUrl}${img}`),
          brochureUrl: product.brochureUrl
        };
      });

      return {
        id: category.id,
        categoryKey: category.categoryKey,
        displayName: category.displayName,
        description: category.description,
        products: products
      };
    });

    res.json({
      categories: formattedCategories
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
