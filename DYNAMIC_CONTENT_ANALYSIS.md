# Carebridge Website - Dynamic Content Analysis
## Content-Only Dynamic Replacement (No Structure Changes)

## 📋 **Component-by-Component Analysis**

### 1. **Home Component** (`/src/app/pages/home/`)

#### **Dynamic Content Areas:**

**🎯 Hero Section (Lines 9-21)**
```typescript
// Current static content to make dynamic:
content = {
  heroMainTitle: "Your Partner In",
  heroSubTitle: "Remote Health",
  heroMainText: "Monitoring", 
  heroDescription: "Empowering healthcare providers and patients with an integrated telemedicine ecosystem—where data, devices, and care converge effortlessly.",
  heroButtonText: "Know More",
  heroImage: "/images/home-img.png"
}
```

**🎯 Features Section (Lines 31-56)**
```typescript
features = {
  sectionTitle: "Innovating Remote Healthcare,",
  sectionSubtitle: "The Carebridge Way",
  feature1: {
    title: "Integrated Suite of Telehealth Ecosystem",
    icon: "" // Currently empty div with bg color
  },
  feature2: {
    title: "Future Ready with ABHA and NHDM Compliance",
    icon: ""
  },
  feature3: {
    title: "Real-Time Monitoring & Preventive Care", 
    icon: ""
  },
  feature4: {
    title: "Accessible Healthcare Anytime, Anywhere",
    icon: ""
  }
}
```

**🎯 Challenges Section (Lines 64-105)**
```typescript
challenges = {
  sectionTitle: "Remote Healthcare",
  sectionSubtitle: "Challenges",
  sectionDescription: "Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.",
  challenge1: {
    number: "01",
    title: "Access Gaps",
    description: "Millions of patients struggle to access specialist care due to geographical barriers, and limited availability of healthcare professionals in rural areas"
  },
  challenge2: {
    number: "02", 
    title: "Resource Strain",
    description: "Healthcare facilities are overwhelmed with inefficient scheduling systems, and staff shortages, leading to burnout and compromised patient care quality"
  },
  challenge3: {
    number: "03",
    title: "Data Silos", 
    description: "Patient information remains fragmented across multiple systems, creating incomplete medical histories, duplicate tests, and delayed treatment"
  }
}
```

**🎯 Ecosystem Section (Lines 110-169)**
```typescript
ecosystem = {
  sectionTitle: "End-to-End",
  sectionSubtitle: "Telemedicine Ecosystem",
  sectionDescription: "From connected monitoring devices to a secure patient-data platform and on-demand clinical support, Carebridge Technologies delivers everything you need to scale remote care—seamlessly",
  platforms: {
    title: "Platforms",
    description: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis.",
    image: "/images/desktop-mockup.svg"
  },
  devices: {
    title: "Devices",
    description: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper.",
    image: "/images/bundle.svg"
  },
  services: {
    title: "Services", 
    description: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper.",
    image: "/images/mobile-mockup.svg"
  }
}
```

**🎯 Target Audience Tabs (Lines 172-211)**
```typescript
// Current hardcoded tabs data
targetAudience = {
  sectionTitle: "Who is it",
  sectionSubtitle: "for?",
  tabs: [
    {
      id: 'clinics',
      title: 'Clinics',
      image: '/images/benyamin.png',
      description: 'Improved patient management to grow patient capacity and virtual visits'
    },
    {
      id: 'hospitals', 
      title: 'Hospitals',
      image: '/images/benyamin.png',
      description: 'Better hospital workflows, patient record integration, and digital OPD.'
    },
    {
      id: 'phc',
      title: 'PHC', 
      image: '/images/benyamin.png',
      description: 'Streamlined PHC management and rural health support with telemedicine.'
    },
    {
      id: 'ngo',
      title: 'NGO & Health Camps',
      image: '/images/benyamin.png', 
      description: 'NGOs can manage health camps, patient registration, and follow-ups.'
    },
    {
      id: 'home',
      title: 'Home Care',
      image: '/images/benyamin.png',
      description: 'Enable home care visits, track vitals, and connect patients to doctors virtually.'
    }
  ]
}
```

**🎯 Company Logos Section (Lines 217-228)**
```typescript
companyLogos = {
  sectionTitle: "Trusted by",
  sectionSubtitle: "10,000+ companies around the world",
  logos: [
    { name: "Google", image: "/images/Google.png" },
    { name: "Facebook", image: "/images/facebook-gray.png" },
    { name: "YouTube", image: "/images/YouTube.png" },
    { name: "Pinterest", image: "/images/Pinterest.png" },
    { name: "Twitch", image: "/images/Twitch.png" },
    { name: "Webflow", image: "/images/Webflow.png" }
  ]
}
```

**🎯 Testimonials Section (Lines 233-286)**
```typescript
testimonials = {
  sectionTitle: "What our",
  sectionSubtitle: "Clients say",
  sectionDescription: "Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.",
  testimonial1: {
    profileImage: "/images/profile.svg",
    title: "An amazing service",
    content: "Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.",
    name: "John Carter",
    position: "Designer at BRIX Templates"
  },
  testimonial2: {
    profileImage: "/images/profile.svg",
    title: "One of a kind service", 
    content: "Ultrices eros in cursus turpis massa tincidunt sem nulla pharetra diam sit amet nisl suscipit adipis.",
    name: "Sophie Moore",
    position: "Head of Design at BRIX Templates"
  },
  testimonial3: {
    profileImage: "/images/profile.svg", 
    title: "The best service",
    content: "Convallis posuere morbi leo urna molestie at elementum eu facilisis sapien pellentesque habitant.",
    name: "Andy Smith",
    position: "Developer at BRIX Templates"
  }
}
```

**🎯 CTA Section (Lines 290-305)**
```typescript
ctaSection = {
  title: "Create your account today and get started for free!",
  buttonText: "Get in Touch",
  backgroundImage: "/images/home-image.svg"
}
```

### 2. **About Component** (`/src/app/pages/about/`)

#### **Dynamic Content Areas:**

**🎯 Page Header (Lines 8-10)**
```typescript
pageHeader = {
  mainTitle: "We're here to",
  subtitle: "guarantee your success"
}
```

**🎯 Company Description (Lines 14-17)**
```typescript
companyDescription = {
  text: "At Carebridge Technologies, a subsidiary of Maestros Electronics, we're driven by one goal: to connect people to care—anywhere, anytime. By combining innovative devices, a secure digital platform, and expert clinical support, we make it simple for providers to extend their reach beyond clinic walls.",
  image: "/images/untitled.png"
}
```

**🎯 Mission Section (Lines 26-28 & 41-83)**
```typescript
mission = {
  sectionTitle: "We're here for you",
  sectionSubtitle: "no matter where you are",
  worldMapImage: "/images/WorldMap.png",
  missionTitle: "Our",
  missionSubtitle: "Mission", 
  missionDescription: "Build a wellness ecosystem that empowers individuals, eases the burden on healthcare systems, and catches risks before they become crises.",
  features: [
    {
      icon: "/images/ImagePlaceholder.png",
      title: "Early Detection of Disease",
      description: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalar cons elementum tempus hac."
    },
    {
      icon: "/images/ImagePlaceholder.png", 
      title: "Remote Patient Management",
      description: "Lorem ipsum dolor sit amet consecte turole adipiscing elit semper dalaracc lacus velolte facilisis volutpat est velitolm."
    },
    {
      icon: "/images/ImagePlaceholder.png",
      title: "Community-Driven Wellness", 
      description: "Lorem ipsum dolor sit amet consecte turole adipiscing elit semper dalaracc lacus velolte facilisis volutpat est velitolm."
    }
  ]
}
```

**🎯 Company Statistics (Lines 87-121)**
```typescript
statistics = {
  sectionTitle: "Our",
  sectionSubtitle: "Commitment",
  stats: [
    {
      number: "99",
      symbol: "%",
      title: "Customer satisfaction",
      description: "Ensuring uninterrupted access for every user."
    },
    {
      number: "32", 
      symbol: "M",
      title: "Active users",
      description: "Powering millions of health measurements daily."
    },
    {
      number: "240",
      symbol: "%", 
      title: "Company growth",
      description: "Accelerating adoption across clinics and enterprises."
    }
  ]
}
```

**🎯 Team Section (Lines 125-182)**
```typescript
team = {
  sectionTitle: "Meet our",
  sectionSubtitle: "team members",
  sectionDescription: "Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat gravida malesuada quam commodo id integer nam.",
  members: [
    {
      profileImage: "/images/profile.svg",
      name: "John Carter", 
      position: "CEO & Co-Founder",
      bio: "Lorem ipsum dolor sit amet consecte adipiscing elit amet hendrerit pretium nulla sed enim iaculis mi.",
      socialLinks: {
        facebook: "",
        twitter: "",
        instagram: "", 
        linkedin: ""
      }
    }
    // Repeated for other team members
  ]
}
```

**🎯 Contact Section (Lines 185-251)**
```typescript
contactSection = {
  sectionLabel: "Contact us",
  sectionTitle: "Get in",
  sectionSubtitle: "touch today",
  sectionDescription: "Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.",
  contactInfo: {
    email: "contact@company.com",
    phone: "(123) 456 - 789",
    address: "794 Mcallister St\nSan Francisco, 94102"
  }
}
```

### 3. **Contact Component** (`/src/app/pages/contact/`)

#### **Dynamic Content Areas:**

**🎯 Page Header (Lines 15-20)**
```typescript
pageHeader = {
  title: "Get in",
  subtitle: "touch today", 
  description: "Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan."
}
```

**🎯 Contact Details (Lines 58-88)**
```typescript
contactDetails = {
  sectionTitle: "Contact details",
  location: {
    label: "Our location",
    value: "58 Middle Point Rd\nSan Francisco, 94124"
  },
  phone: {
    label: "Call us", 
    value: "(123) 456 - 789"
  },
  email: {
    label: "Email us",
    value: "contact@company.com"
  }
}
```

### 4. **Device Component** (`/src/app/pages/device/`)

#### **Dynamic Content Areas:**

**🎯 Product Categories (Lines 7-21)**
```typescript
categories = [
  { key: "Devices", label: "Devices" },
  { key: "Kiosks", label: "Kiosks" }, 
  { key: "Kits", label: "Kits" }
]
```

**🎯 Product Details (Lines 53-66, 97-110, 141-154)**
```typescript
products = [
  {
    name: "MR 300",
    specifications: [
      "5\" Color TFT display",
      "12 Leads simultaneous ECG acquisition",
      "3 Channel ECG Recording", 
      "Interpretation Facility",
      "Memory storage for 5 patients",
      "Auto & Manual mode of operation",
      "PDF convertor to transfer ECG from device to USB",
      "Display of 12 Lead ECG waveform",
      "ECG lead annotation facility"
    ],
    images: [
      "/images/ImagePlaceholder.png",
      // Multiple images for carousel
    ],
    brochureText: "Download Brochure"
  }
  // Repeated for other products
]
```

### 5. **News Component** (`/src/app/pages/news/`)

#### **Dynamic Content Areas:**

**🎯 Page Header (Lines 7-11)**
```typescript
pageHeader = {
  title: "Latest",
  subtitle: "News & Updates",
  description: "Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan."
}
```

**🎯 Featured News (Lines 16-29)**
```typescript
featuredNews = {
  videoThumbnail: "/images/news-img.svg",
  companyLogo: "/images/Facebook.png", 
  quote: "Lorem ipsum dolor sit amet conse ctetur adipiscing elit Vel mauris turpis vel eget nec orci nec ipsum Elementum felis eu pellentesque velit vulputate. Blandit consequat facilisi sagittis ut quis Integer et faucibus elemen.",
  authorName: "John Carter",
  authorPosition: "Creative Director at Facebook"
}
```

**🎯 Social Media Section (Lines 33-51)**
```typescript
socialMedia = {
  sectionTitle: "Follow us on",
  sectionSubtitle: "Linkedin", 
  sectionDescription: "Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan.",
  buttonText: "Follow us",
  galleryImages: [
    "/images/img-1.png",
    "/images/img-2.png", 
    "/images/img-3.png",
    "/images/img-4.png"
  ]
}
```

### 6. **Product Details Component** (`/src/app/pages/product-details/`)

#### **Dynamic Content Areas:**

**🎯 Platform Tabs (Lines 9-21)**
```typescript
platformTabs = [
  { key: "Consensus", label: "Consensus" },
  { key: "CoddleOnline", label: "CoddleOnline" },
  { key: "Rhythms24x7", label: "Rhythms24x7" }
]
```

**🎯 Platform Content (Lines 28-137)**
```typescript
platforms = {
  consensus: {
    logo: "/images/consensus.png",
    description: "Secure telemedicine and tele-consulting platform that enables healthcare providers to deliver quality care anytime, anywhere. It bridges the gap between patients and doctors through real-time video consultations, medical data sharing, and collaborative treatment planning.",
    certificationTitle: "ABDM Certified Software",
    certificationDescription: "Enabling seamless integration with India's NDHM ecosystem for secure, interoperable patient data",
    certificationIcon: "/images/displayNo.png",
    images: ["/images/ImagePlaceholder.png"] // Multiple carousel images
  },
  coddleOnline: {
    logo: "/images/coddle-logo.png", 
    description: "Every 10 minutes in India, a mother dies from pregnancy-related complications—most of them preventable. With 30M pregnancies annually and 59% classified as high-risk, there is an urgent need for continuous monitoring, timely interventions, and better doctor-patient connectivity. Coddle Online, is a cloud-based maternal health platform designed to reduce maternal mortality by connecting patients, doctors, and health workers on a single digital ecosystem. It provides real-time monitoring, electronic health records (EHR), and teleconsultations, ensuring safer outcomes for mothers and newborns.",
    images: ["/images/ImagePlaceholder.png"]
  },
  rhythms24x7: {
    logo: "/images/rhythams.png",
    description: "Rhythms24x7 is a cutting-edge web-based tele-cardiology platform designed for real-time sharing of vital cardiac parameters and remote management of cardiac emergencies. Our ultra-compact device paired with a secure cloud-based data hub revolutionizes how cardiac data is captured, shared, and managed, facilitating early diagnosis and enhancing healthcare provider and patient experience. With seamless integration to hospitals and ambulances, Rhythms24x7 ensures critical patients receive urgent treatment within the golden hour.",
    images: ["/images/ImagePlaceholder.png"]
  }
}
```

**🎯 How It Works (Lines 142-147)**
```typescript
howItWorks = {
  sectionTitle: "HOW IT",
  sectionSubtitle: "WORKS",
  processImage: "/images/work.svg"
}
```

**🎯 Achievements (Lines 150-198)**
```typescript
achievements = {
  sectionTitle: "WHAT YOU", 
  sectionSubtitle: "achieve",
  benefits: [
    {
      icon: "/images/reach-remote.svg",
      title: "Reach Remote Communities",
      description: "Deliver quality healthcare to rural and underserved areas through teleconsultations and remote diagnostics"
    },
    {
      icon: "/images/cut-travel.svg",
      title: "Cut Travel & Wait Times", 
      description: "Connect patients with doctors instantly, eliminating long commutes and clinic queues"
    },
    {
      icon: "/images/enable-expert.svg",
      title: "Enable Expert Collaboration",
      description: "Bring multiple specialists together virtually for faster, better clinical decisions"
    },
    {
      icon: "/images/manage-health.svg",
      title: "Manage Health Proactively",
      description: "Support chronic disease management and preventive care with continuous remote monitoring"
    }
  ]
}
```

### 7. **Header Component** (`/src/app/layout/header/`)

#### **Dynamic Content Areas:**

**🎯 Logo and Navigation (Lines 5, 12-55, 57)**
```typescript
header = {
  logo: "/images/logo.svg",
  ctaButtonText: "Get in Touch",
  navigationItems: [
    {
      id: 'home',
      label: 'Home',
      route: '/home',
      displayOrder: 1
    },
    {
      id: 'about',
      label: 'About',
      route: '/about-us',
      displayOrder: 2
    },
    {
      id: 'platforms',
      label: 'Platforms',
      route: '/product-details',
      displayOrder: 3
    },
    {
      id: 'services',
      label: 'Services',
      route: '#',
      displayOrder: 4
    },
    {
      id: 'devices',
      label: 'Devices',
      route: '/device',
      displayOrder: 5
    },
    {
      id: 'news',
      label: 'News',
      route: '/news',
      displayOrder: 6
    }
  ]
}
```

### 8. **Footer Component** (`/src/app/layout/footer/`)

#### **Dynamic Content Areas:**

**🎯 Footer Content (Lines 4, 7-12)**
```typescript
footer = {
  logo: "/images/logo.svg",
  copyrightText: "Copyright © {currentYear} Carebridge Technologies India Pvt Ltd",
  rightsText: "All Rights Reserved"
}
```

## 📊 **Simplified Database Schema**

### **Content Table Structure**

```sql
-- Single content table for all text/image replacements
CREATE TABLE content_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    page_key VARCHAR(50) NOT NULL,        -- 'home', 'about', 'contact', etc.
    section_key VARCHAR(100) NOT NULL,    -- 'hero_title', 'hero_description', etc.  
    content_key VARCHAR(100) NOT NULL,    -- 'title', 'description', 'image', etc.
    content_value TEXT,                   -- The actual content
    content_type ENUM('text', 'image', 'json') DEFAULT 'text',
    display_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_content (page_key, section_key, content_key)
);

-- Team members table (for about page)
CREATE TABLE team_members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100),
    bio TEXT,
    profile_image VARCHAR(500),
    social_facebook VARCHAR(300),
    social_twitter VARCHAR(300), 
    social_instagram VARCHAR(300),
    social_linkedin VARCHAR(300),
    display_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table (for device page)
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_key VARCHAR(50),             -- 'devices', 'kiosks', 'kits'
    product_name VARCHAR(200) NOT NULL,
    specifications JSON,                  -- Array of specification strings
    main_image VARCHAR(500),
    gallery_images JSON,                  -- Array of image URLs
    brochure_url VARCHAR(500),
    display_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Company logos table (for home page)
CREATE TABLE company_logos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(100),
    logo_image VARCHAR(500),
    display_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Form submissions table
CREATE TABLE form_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    form_type ENUM('contact', 'about') NOT NULL,
    name VARCHAR(100),
    email VARCHAR(150),
    phone VARCHAR(20),
    company VARCHAR(100),
    message TEXT,
    status ENUM('new', 'read', 'responded') DEFAULT 'new',
    created_at TIMESTAMP
);

-- Navigation (menu_items)

### **Menu Items Table Structure**

```sql
-- Menu items table for dynamic navigation
CREATE TABLE menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    menu_key VARCHAR(50) NOT NULL,           -- 'main_navigation'
    item_key VARCHAR(50) NOT NULL,           -- 'home', 'about', 'platforms', etc.
    label VARCHAR(100) NOT NULL,             -- Display text: 'Home', 'About', etc.
    route VARCHAR(200),                      -- Angular route: '/home', '/about-us', etc.
    display_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_menu_item (menu_key, item_key)
);
```

## 🔌 **Minimal API Endpoints**

### **Content API**
```javascript
// GET /api/content/:pageKey - Get all content for a page
// GET /api/content/:pageKey/:sectionKey - Get section content
// PUT /api/admin/content/:id - Update content item

// Example responses:
GET /api/content/home
{
  "hero": {
    "main_title": "Your Partner In",
    "sub_title": "Remote Health", 
    "main_text": "Monitoring",
    "description": "Empowering healthcare providers...",
    "button_text": "Know More",
    "image": "/images/home-img.png"
  },
  "features": {
    "section_title": "Innovating Remote Healthcare,",
    "section_subtitle": "The Carebridge Way"
  }
  // ... other sections
}
```

### **Team API**
```javascript
// GET /api/team - Get all active team members
// POST /api/admin/team - Create team member
// PUT /api/admin/team/:id - Update team member

// Example response:
GET /api/team
{
  "team_members": [
    {
      "id": 1,
      "name": "John Carter",
      "position": "CEO & Co-Founder", 
      "bio": "Lorem ipsum...",
      "profile_image": "/uploads/team/john.jpg",
      "social_links": {
        "facebook": "https://facebook.com/john",
        "linkedin": "https://linkedin.com/in/john"
      }
    }
  ]
}
```

### **Products API**
```javascript
// GET /api/products/:category - Get products by category
// POST /api/admin/products - Create product

// Example response:
GET /api/products/devices
{
  "products": [
    {
      "id": 1,
      "product_name": "MR 300",
      "specifications": [
        "5\" Color TFT display",
        "12 Leads simultaneous ECG acquisition"
      ],
      "main_image": "/uploads/products/mr300.jpg",
      "gallery_images": ["/uploads/products/mr300-1.jpg"],
      "brochure_url": "/uploads/brochures/mr300.pdf"
    }
  ]
}
```

### **Forms API**
```javascript
// POST /api/forms/contact - Submit contact form
// GET /api/admin/forms - Get form submissions

// Example request:
POST /api/forms/contact
{
  "name": "John Doe",
  "email": "john@example.com", 
  "phone": "123-456-7890",
  "company": "ABC Corp",
  "message": "Interested in your services"
}
```

### **Navigation API**
```javascript
// GET /api/navigation/:menuKey - Get navigation menu items
// POST /api/admin/navigation - Create menu item
// PUT /api/admin/navigation/:id - Update menu item

// Example response:
GET /api/navigation/main_navigation
{
  "menuKey": "main_navigation",
  "items": [
    {
      "id": 1,
      "itemKey": "home",
      "label": "Home",
      "route": "/home",
      "displayOrder": 1
    },
    {
      "id": 2,
      "itemKey": "about",
      "label": "About",
      "route": "/about-us",
      "displayOrder": 2
    },
    {
      "id": 3,
      "itemKey": "platforms",
      "label": "Platforms", 
      "route": "/product-details",
      "displayOrder": 3
    },
    {
      "id": 4,
      "itemKey": "services",
      "label": "Services",
      "route": "#",
      "displayOrder": 4
    },
    {
      "id": 5,
      "itemKey": "devices",
      "label": "Devices",
      "route": "/device",
      "displayOrder": 5
    },
    {
      "id": 6,
      "itemKey": "news",
      "label": "News",
      "route": "/news",
      "displayOrder": 6
    }
  ]
}
```

This approach keeps the structure intact while making all text and images dynamically manageable through AdminJS!
