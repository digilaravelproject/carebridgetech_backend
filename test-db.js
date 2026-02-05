const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('Testing connection...');

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'carebridge',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: console.log
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });
