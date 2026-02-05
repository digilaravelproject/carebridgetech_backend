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
    logging: false,
  }
);

const fs = require('fs');

async function check() {
  try {
    await sequelize.authenticate();
    const [results] = await sequelize.query("DESCRIBE product_content_sections");
    const hasPlatformId = results.some(row => row.Field === 'platform_id');
    const output = `Has platform_id: ${hasPlatformId}\n` + (hasPlatformId ? JSON.stringify(results.find(row => row.Field === 'platform_id')) : '');
    fs.writeFileSync('db_status.txt', output);
  } catch (error) {
    fs.writeFileSync('db_status.txt', `Check failed: ${error.message}`);
  } finally {
    process.exit();
  }
}

check();
