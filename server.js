const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
require('dotenv').config();

// Import database and models
const { sequelize } = require('./src/models');
const adminJs = require('./src/admin/adminjs.config');
const authConfig = require('./src/admin/auth');
const AdminJSExpress = require('@adminjs/express');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure required directories exist
function ensureDirectories() {
  const directories = [
    'uploads/products',
    'uploads/platforms',
    'uploads/team',
    'uploads/news',
    'uploads/logos',
    'uploads/categories',
    'uploads/testimonials',
    'uploads/social',
    'uploads/content',
    'uploads/product-details/platform-logos',
    'uploads/product-details/platform-images',
    'uploads/product-details/features',
    'uploads/product-details/sections',
    'uploads/product-details/achievements',
    'uploads/product-details/audiences',
    'uploads/product-details/deployments',
    'uploads/product-details/solutions',
    'assets'
  ];

  directories.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
}

// Test database connection
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
}

// Morgan logging middleware
app.use(morgan('dev'));

// Basic CORS middleware first
app.use(cors('*'));

// AdminJS routes with simple authentication
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: authConfig.authenticate,
  cookiePassword: authConfig.cookiePassword
});

// Add upload tool redirect route BEFORE AdminJS routes  
app.get('/admin/upload-tool', (req, res) => {
  res.redirect('/upload-test.html');
});

// Add a simple info page for upload instructions
app.get('/admin/help', (req, res) => {
  res.redirect('/admin-instructions.html');
});

app.use(adminJs.options.rootPath, adminRouter);

// Body parser middleware AFTER AdminJS
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Serve static files (uploads, assets, and public)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/', (req, res) => {
  res.json({ message: "API root working" });
});

// API Routes
app.use('/api/content', require('./src/routes/content'));
app.use('/api/team', require('./src/routes/team'));
app.use('/api/products', require('./src/routes/products'));
app.use('/api/logos', require('./src/routes/logos'));
app.use('/api/forms', require('./src/routes/forms'));
app.use('/api/navigation', require('./src/routes/navigation'));
app.use('/api/news', require('./src/routes/news'));
app.use('/api/upload', require('./src/routes/upload'));
app.use('/api/pages', require('./src/routes/home'));
app.use('/api/product-details', require('./src/routes/product-details'));
app.use('/api/contact', require('./src/routes/contact'));

//here serve aupload html
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'upload-test.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server
async function startServer() {
  try {
    // Ensure required directories exist
    ensureDirectories();
    
    // Test database connection
    await testDatabaseConnection();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 AdminJS available at http://localhost:${PORT}${adminJs.options.rootPath}`);
      console.log(`🏥 CareBridge API ready at http://localhost:${PORT}`);
      console.log(`📱 Frontend should connect to http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Graceful shutdown initiated...');
  try {
    await sequelize.close();
    console.log('✅ Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

startServer();
