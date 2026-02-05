const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
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

async function checkIndexes() {
  try {
    await sequelize.authenticate();
    const [results] = await sequelize.query("SHOW INDEX FROM product_content_sections");
    
    let output = 'Indexes on product_content_sections:\n';
    results.forEach(index => {
        output += `Name: ${index.Key_name}, Column: ${index.Column_name}, Non_unique: ${index.Non_unique}\n`;
    });
    
    fs.writeFileSync('db_indexes.txt', output);
    console.log(output);
  } catch (error) {
    fs.writeFileSync('db_indexes.txt', `Error: ${error.message}`);
    console.error(error);
  } finally {
    process.exit();
  }
}

checkIndexes();
