const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Configure multer for content image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../../uploads/content');
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename: timestamp-originalname
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s/g, '-');
    cb(null, uniqueName);
  }
});

// File filter - only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Upload endpoint
router.post('/content-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Return the file path that can be stored in database
    const filePath = `/uploads/content/${req.file.filename}`;
    
    res.json({
      success: true,
      message: 'File uploaded successfully',
      filePath: filePath,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Upload failed',
      message: error.message
    });
  }
});

// Delete file endpoint
router.delete('/content-image/:filename', (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../../uploads/content', filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      res.status(404).json({
        error: 'File not found'
      });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      error: 'Delete failed',
      message: error.message
    });
  }
});

module.exports = router;

// Helper function to recursively get files
const getFilesRecursively = (dir, fileList = [], baseDir = '') => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getFilesRecursively(filePath, fileList, path.join(baseDir, file));
    } else {
      if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
        fileList.push({
          name: file,
          path: '/uploads/' + (baseDir ? baseDir.replace(/\\/g, '/') + '/' : '') + file,
          relativePath: (baseDir ? baseDir.replace(/\\/g, '/') + '/' : '') + file,
          size: stat.size,
          created: stat.birthtime
        });
      }
    }
  });
  
  return fileList;
};

// GET /api/upload/files - List all uploaded files
router.get('/files', (req, res) => {
  try {
    const uploadBaseDir = path.join(__dirname, '../../uploads');
    
    if (!fs.existsSync(uploadBaseDir)) {
      return res.json({ success: true, files: [] });
    }
    
    // We want to scan specific subdirectories to keep it clean, or just scan all
    // Let's scan all but organize them flattened for the gallery
    const files = getFilesRecursively(uploadBaseDir);
    
    // Sort by creation date desc
    files.sort((a, b) => b.created - a.created);
    
    res.json({
      success: true,
      count: files.length,
      files: files
    });
  } catch (error) {
    console.error('List files error:', error);
    res.status(500).json({
      error: 'Failed to list files',
      message: error.message
    });
  }
});
