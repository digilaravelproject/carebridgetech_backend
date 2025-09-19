const express = require('express');
const { MenuItem } = require('../models');
const router = express.Router();

// GET /api/navigation/:menuKey - Get navigation menu items
router.get('/:menuKey', async (req, res) => {
  try {
    const { menuKey } = req.params;
    
    const menuItems = await MenuItem.findAll({
      where: { 
        menuKey, 
        status: 'active' 
      },
      order: [['displayOrder', 'ASC'], ['label', 'ASC']]
    });

    res.json({
      menuKey,
      items: menuItems.map(item => ({
        id: item.id,
        itemKey: item.itemKey,
        label: item.label,
        route: item.route,
        displayOrder: item.displayOrder
      }))
    });
  } catch (error) {
    console.error('Error fetching navigation menu:', error);
    res.status(500).json({ 
      error: 'Failed to fetch navigation menu',
      message: error.message 
    });
  }
});

// GET /api/navigation - Get all navigation menus
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll({
      where: { status: 'active' },
      order: [['menuKey', 'ASC'], ['displayOrder', 'ASC']]
    });

    const groupedMenus = {};
    menuItems.forEach(item => {
      if (!groupedMenus[item.menuKey]) {
        groupedMenus[item.menuKey] = [];
      }
      groupedMenus[item.menuKey].push({
        id: item.id,
        itemKey: item.itemKey,
        label: item.label,
        route: item.route,
        displayOrder: item.displayOrder
      });
    });

    res.json({
      menus: groupedMenus
    });
  } catch (error) {
    console.error('Error fetching navigation menus:', error);
    res.status(500).json({ 
      error: 'Failed to fetch navigation menus',
      message: error.message 
    });
  }
});

module.exports = router;
