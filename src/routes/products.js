const express = require('express');
const { Product } = require('../models');
const router = express.Router();

// GET /api/products/:category - Get products by category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const products = await Product.findAll({
      where: { 
        categoryKey: category,
        status: 'active' 
      },
      order: [['displayOrder', 'ASC'], ['productName', 'ASC']]
    });

    res.json({
      category,
      products: products.map(product => ({
        id: product.id,
        productName: product.productName,
        specifications: product.specifications || [],
        mainImage: product.mainImage,
        galleryImages: product.galleryImages || [],
        brochureUrl: product.brochureUrl
      }))
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
    products.forEach(product => {
      if (!groupedProducts[product.categoryKey]) {
        groupedProducts[product.categoryKey] = [];
      }
      groupedProducts[product.categoryKey].push({
        id: product.id,
        productName: product.productName,
        specifications: product.specifications || [],
        mainImage: product.mainImage,
        galleryImages: product.galleryImages || [],
        brochureUrl: product.brochureUrl
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
