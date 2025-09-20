#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 CareBridge API Setup');
console.log('=====================\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('📝 Please copy .env.example to .env and configure your database settings:');
  console.log('   cp .env.example .env');
  console.log('   Then edit .env with your MySQL database credentials\n');
  process.exit(1);
}

console.log('✅ .env file found');

// Check upload directories
const uploadDirs = [
  'uploads/products',
  'uploads/platforms', 
  'uploads/team',
  'uploads/news',
  'uploads/categories',
  'uploads/testimonials',
  'uploads/social',
  'assets'
];

console.log('📁 Checking upload directories...');
uploadDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  } else {
    console.log(`✅ Directory exists: ${dir}`);
  }
});

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MySQL is running');
console.log('2. Create database: CREATE DATABASE carebridge;');
console.log('3. Run: npm run migrate');
console.log('4. Run: npm run dev');
console.log('5. Visit: http://localhost:5000/admin');
console.log('\n📧 Admin credentials:');
console.log('   Email: admin@carebridge.com');
console.log('   Password: CareBridge2024!');
console.log('\n📚 API Documentation: http://localhost:5000/api');
console.log('🌐 Health Check: http://localhost:5000/health');
