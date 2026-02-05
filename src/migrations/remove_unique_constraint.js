const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log,
  }
);

async function removeConstraint() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    
    const queryInterface = sequelize.getQueryInterface();
    const table = 'product_content_sections';
    const column = 'section_key';

    // 1. Check indexes
    const [indexes] = await sequelize.query(`SHOW INDEX FROM ${table}`);
    console.log('Current indexes:', indexes);

    // Filter for unique index on section_key
    // Note: The index name might be 'section_key' or 'product_content_sections_section_key_unique'
    const uniqueIndex = indexes.find(idx => idx.Column_name === column && idx.Non_unique === 0 && idx.Key_name !== 'PRIMARY');

    if (uniqueIndex) {
      console.log(`Found unique index: ${uniqueIndex.Key_name}. Removing it...`);
      await queryInterface.removeIndex(table, uniqueIndex.Key_name);
      console.log('Index removed successfully.');
    } else {
      console.log('No unique index found on section_key.');
    }
    
    // Optional: Add a non-unique index for performance?
    // awaity queryInterface.addIndex(table, [column]);

    console.log('Done.');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

removeConstraint();
