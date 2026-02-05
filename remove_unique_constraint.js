const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

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

const fs = require('fs');

async function log(msg) {
  fs.appendFileSync('constraint_log.txt', msg + '\n');
}

async function removeConstraint() {
  try {
    log('Script started');
    await sequelize.authenticate();
    log('Database connected.');
    
    const queryInterface = sequelize.getQueryInterface();
    const table = 'product_content_sections';
    const column = 'section_key';

    // 1. Check indexes
    const [indexes] = await sequelize.query(`SHOW INDEX FROM ${table}`);
    log('Current indexes loaded');

    // Filter for unique index on section_key
    const uniqueIndex = indexes.find(idx => idx.Column_name === column && idx.Non_unique === 0 && idx.Key_name !== 'PRIMARY');

    if (uniqueIndex) {
      log(`Found unique index: ${uniqueIndex.Key_name}. Removing it...`);
      await queryInterface.removeIndex(table, uniqueIndex.Key_name);
      log('Old index removed successfully.');
    } else {
      log('No old unique index found on section_key to remove.');
    }

    // 2. Add composite unique index
    try {
      log('Adding composite unique index (platform_id + section_key)...');
      await queryInterface.addIndex(table, ['platform_id', 'section_key'], {
        unique: true,
        name: 'product_content_sections_platform_id_section_key_unique'
      });
      log('Composite unique index added successfully.');
    } catch (err) {
      if (err.original && err.original.code === 'ER_DUP_KEY') {
         log('Composite index already exists.');
      } else {
         log(`Failed to add composite index: ${err.message}`);
      }
    }
    
    log('Done.');
    process.exit(0);
  } catch (error) {
    log(`Error: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

removeConstraint();
