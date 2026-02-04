const { sequelize } = require('./src/models');
const { MenuItem, ProductPlatform } = require('./src/models');
require('dotenv').config();

async function diagnose() {
  try {
    console.log('Testing DB connection...');
    await sequelize.authenticate();
    console.log('✅ Connection successful');

    console.log('Checking tables...');
    const tables = await sequelize.getQueryInterface().showAllSchemas();
    console.log('Tables found:', tables); // Note: showAllSchemas might return array of objects or strings depending on dialect

    // Try to count MenuItems
    try {
        const menuCount = await MenuItem.count();
        console.log(`✅ MenuItem table exists. Count: ${menuCount}`);
    } catch (e) {
        console.error('❌ MenuItem table check failed:', e.message);
    }

    // Try to count ProductPlatforms
    try {
        const platformCount = await ProductPlatform.count();
        console.log(`✅ ProductPlatform table exists. Count: ${platformCount}`);
    } catch (e) {
        console.error('❌ ProductPlatform table check failed:', e.message);
    }

  } catch (error) {
    console.error('❌ Critical DB Error:', error.message);
  } finally {
    process.exit();
  }
}

diagnose();
