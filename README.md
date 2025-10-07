# CareBridge API Backend

A simplified Node.js backend API with AdminJS for content-only dynamic management of the CareBridge Technologies website.

## Features

✅ **Content-Only Dynamic System** - Text and images are dynamic, structure stays the same  
✅ **AdminJS Admin Panel** - Easy-to-use content management interface  
✅ **MySQL Database** - Reliable data storage with Sequelize ORM  
✅ **RESTful APIs** - Clean API endpoints for frontend integration  
✅ **File Upload Support** - Image upload functionality  
✅ **Authentication** - Secure admin panel access  
✅ **Form Management** - Contact and about page forms  
✅ **Dynamic Content** - Page content managed through key-value pairs  
✅ **Team Management** - Team member profiles  
✅ **Product Catalog** - Products organized by categories  
✅ **Company Logos** - Trusted partners section  
✅ **Dynamic Navigation** - Admin-controlled menu items  

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. **Clone and setup**
```bash
cd carebridge-api
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Setup MySQL database**
```sql
CREATE DATABASE carebridge;
```

4. **Run database migration**
```bash
npm run migrate
```

5. **Start development server**
```bash
npm run dev
```

## Environment Variables

```bash
# Server Configuration
NODE_ENV=development
PORT=5000

# MySQL Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=carebridge
DB_USER=root
DB_PASSWORD=your_mysql_password

# Admin Authentication
ADMIN_EMAIL=admin@carebridge.com
ADMIN_PASSWORD=your_secure_password
COOKIE_SECRET=your_cookie_secret_key

# Frontend Integration
CLIENT_URL=http://localhost:4200

# File Uploads
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
```

## Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run migrate    # Run database migrations and seed data
```

## API Endpoints

### Content Management
- `GET /api/content/:pageKey` - Get all content for a page
- `GET /api/content/:pageKey/:sectionKey` - Get specific section content

### Team Management
- `GET /api/team` - Get all active team members

### Product Management
- `GET /api/products` - Get all products grouped by category
- `GET /api/products/:category` - Get products by category (devices, kiosks, kits)

### Company Logos
- `GET /api/logos` - Get all company logos

### Navigation
- `GET /api/navigation/:menuKey` - Get menu items for specific menu
- `GET /api/navigation` - Get all navigation menus

### Forms
- `POST /api/forms/contact` - Submit contact form
- `POST /api/forms/about` - Submit about page form

## AdminJS Panel

Access the admin panel at: `http://localhost:5000/admin`

Default credentials:
- Email: `admin@carebridge.com`
- Password: `CareBridge2024!`

### Admin Features

- **Content Management** - Edit page content using key-value pairs
- **Team Management** - Add/edit team member profiles with social links
- **Product Management** - Manage products organized by categories
- **Brand Management** - Upload and manage company logos
- **Navigation Management** - Control menu items and their order
- **Form Management** - View and manage form submissions

## Database Schema

The simplified application uses the following main tables:

- `content_items` - Dynamic page content (key-value pairs)
- `team_members` - Team member profiles and social links
- `products` - Product catalog organized by category keys
- `company_logos` - Company/partner logos for trust section
- `menu_items` - Dynamic navigation menu items
- `form_submissions` - Contact and about form submissions

## Image Upload System

### Upload Tool Interface

For uploading images to Content Items, use the dedicated upload tool:

**URL**: `http://localhost:5000/upload-test.html`

**Features**:
- 🎨 Beautiful drag-and-drop interface
- 📸 Instant image preview
- 📋 One-click URL copying
- ✅ Client & server-side validation
- 🚀 Fast uploads with progress indication

**How to Use**:
1. Open `http://localhost:5000/upload-test.html`
2. Drag & drop your image or click to browse
3. Click "Copy" to copy the generated URL
4. Paste the URL into the `Image Url` field in AdminJS

**API Endpoint**:
```bash
POST /api/upload/content-image
Content-Type: multipart/form-data

# Response
{
  "success": true,
  "filePath": "/uploads/content/1696789123456-image.png",
  "fileName": "1696789123456-image.png",
  "size": 123456
}
```

📖 **Complete Guide**: See [IMAGE_UPLOAD_GUIDE.md](./IMAGE_UPLOAD_GUIDE.md) for detailed documentation

### File Upload Structure

```
uploads/
├── content/      # Content item images (via upload tool)
├── products/     # Product images
├── team/         # Team member photos
├── logos/        # Company logos
└── news/         # News article images
```

## Development

### Adding New Content Types

1. Create Sequelize model in `src/models/`
2. Add to AdminJS configuration in `src/admin/adminjs.config.js`
3. Create API routes in `src/routes/`
4. Update database migration script

### Customizing AdminJS

Edit `src/admin/adminjs.config.js` to:
- Add new resources
- Customize form fields
- Configure file uploads
- Modify branding and theme

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong passwords and secrets
3. Configure SSL/HTTPS
4. Setup database backups
5. Configure reverse proxy (nginx)
6. Enable process management (PM2)

## Security Features

- Input validation and sanitization
- SQL injection prevention (Sequelize ORM)
- XSS protection
- CORS configuration
- Secure session management
- File upload restrictions

## Support

For technical support or questions:
- Email: support@carebridge.com
- Documentation: See additional guides in project root

## License

© 2024 CareBridge Technologies. All rights reserved.
