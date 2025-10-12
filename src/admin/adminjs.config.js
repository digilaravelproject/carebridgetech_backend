const AdminJS = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
const uploadFeature = require('@adminjs/upload');
const path = require('path');
const Dashboard = require('./dashboard');

// Register Sequelize adapter
AdminJS.registerAdapter(AdminJSSequelize);

// Import simplified models
const {
  ContentItem,
  TeamMember,
  Product,
  CompanyLogo,
  FormSubmission,
  MenuItem,
  NewsArticle,
  NewsPageSettings,
  Platform,
  // Product Details models
  ProductPlatform,
  PlatformFeature,
  PlatformImage,
  ProductContentSection,
  ProductAchievement,
  ProductTargetAudience,
  ProductDeploymentOption,
  DeploymentPlatformMapping,
  ProductSolution,
  ProductCTASection,
  // Home Page models
  HomeHero,
  HomeFeatures,
  HomeChallenges,
  HomeChallengeItem,
  HomeEcosystem,
  HomeEcosystemItem,
  HomeTargetAudience,
  HomeTargetAudienceTab,
  HomeCompanyLogos,
  HomeCompanyLogoItem,
  HomeTestimonials,
  HomeTestimonialItem,
  HomeCTA,
  // About Page models
  AboutPageSettings,
  AboutMissionFeature,
  AboutStatistic
} = require('../models');

const adminJs = new AdminJS({
  rootPath: '/admin',
  branding: {
    companyName: 'CareBridge Admin',
    softwareBrothers: false,
    logo: '/images/logo.svg',
    favicon: '/favicon/favicon.ico',
    withMadeWithLove: false,
    theme: {
      colors: {
        primary100: '#005783',
        primary80: '#007BA7', 
        primary60: '#009EE0',
        primary40: '#4FC3E7',
        primary20: '#E8F4FD',
        grey100: '#1a1a1a',
        grey80: '#333333',
        grey60: '#666666',
        grey40: '#999999',
        grey20: '#cccccc',
        filterBg: '#f8f9fa',
        accent: '#007BA7',
        hoverBg: '#f1f1f1'
      }
    }
  },
  resources: [
    // {
    //   resource: ContentItem,
    //   options: {
    //     parent: { name: 'Content Management', icon: 'FileText' },
    //     listProperties: ['pageKey', 'sectionKey', 'contentKey', 'contentType', 'status'],
    //     editProperties: ['pageKey', 'sectionKey', 'contentKey', 'contentValue', 'imageUrl', 'contentType', 'displayOrder', 'status'],
    //     filterProperties: ['pageKey', 'sectionKey', 'contentType', 'status'],
    //     sort: { sortBy: 'pageKey', direction: 'asc' },
    //     properties: {
    //       contentValue: {
    //         type: 'textarea',
    //         props: {
    //           rows: 4
    //         },
    //         description: 'Use this field for text/json content.'
    //       },
    //       // imageUrl: {
    //       //   type: 'string',
    //       //   props: {
    //       //     placeholder: 'Paste image URL here after uploading via the Upload Tool'
    //       //   },
    //       //   description: '📸 UPLOAD TOOL: http://localhost:3000/upload-test.html (open in new tab) | 📖 INSTRUCTIONS: http://localhost:3000/admin-instructions.html | Upload image → Copy URL → Paste here'
    //       // },
    //       pageKey: {
    //         description: 'Example: home, about, contact, news, product-details'
    //       },
    //       sectionKey: {
    //         description: 'Example: hero, features, testimonials, team'
    //       },
    //       contentType: {
    //         description: 'Select "image" when using imageUrl field, "text" for contentValue, "json" for structured data'
    //       }
    //     }
    //   }
    // },
    {
      resource: TeamMember,
      options: {
        parent: { name: 'About Page', icon: 'Info' },
        listProperties: ['name', 'position', 'status', 'displayOrder'],
        editProperties: ['name', 'position', 'bio', 'profileImage', 'socialFacebook', 'socialTwitter', 'socialInstagram', 'socialLinkedin', 'displayOrder', 'status'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          bio: {
            type: 'textarea',
            props: { rows: 4 }
          },
          profileImage: {
            description: 'Enter image path (e.g., /images/profile.svg) or full URL from upload tool'
          }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/team') } },
          properties: { key: 'profileImage', bucket: 'teamImages' }
        })
      ]
    },
    {
      resource: Product,
      options: {
        parent: { name: 'Product Management', icon: 'Package' },
        listProperties: ['productName', 'categoryKey', 'status', 'displayOrder'],
        editProperties: ['categoryKey', 'productName', 'specifications', 'mainImage', 'galleryImages', 'brochureUrl', 'displayOrder', 'status'],
        filterProperties: ['categoryKey', 'status'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          specifications: {
            type: 'textarea',
            props: {
              rows: 6
            }
          },
          galleryImages: {
            type: 'textarea',
            props: {
              rows: 4
            }
          }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/products') } },
          properties: { key: 'mainImage', bucket: 'productImages' }
        })
      ]
    },
    {
      resource: CompanyLogo,
      options: {
        parent: { name: 'Brand Management', icon: 'Image' },
        listProperties: ['companyName', 'status', 'displayOrder'],
        editProperties: ['companyName', 'logoImage', 'displayOrder', 'status'],
        sort: { sortBy: 'displayOrder', direction: 'asc' }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/logos') } },
          properties: { key: 'logoImage', bucket: 'companyLogos' }
        })
      ]
    },
    {
      resource: FormSubmission,
      options: {
        parent: { name: 'Form Management', icon: 'Mail' },
        listProperties: ['formType', 'name', 'email', 'status', 'createdAt'],
        showProperties: ['formType', 'name', 'email', 'phone', 'company', 'message', 'status', 'createdAt'],
        editProperties: ['status'],
        filterProperties: ['formType', 'status'],
        sort: { sortBy: 'createdAt', direction: 'desc' },
        actions: {
          new: { isVisible: false },
          delete: { isVisible: true },
          edit: { 
            isVisible: true,
            showInDrawer: true
          }
        }
      }
    },
    {
      resource: MenuItem,
      options: {
        parent: { name: 'Navigation', icon: 'Navigation' },
        listProperties: ['menuKey', 'itemKey', 'label', 'route', 'displayOrder', 'status'],
        editProperties: ['menuKey', 'itemKey', 'label', 'route', 'displayOrder', 'status'],
        filterProperties: ['menuKey', 'status'],
        sort: { sortBy: 'displayOrder', direction: 'asc' }
      }
    },
    {
      resource: NewsArticle,
      options: {
        parent: { name: 'News Management', icon: 'MessageSquare' },
        listProperties: ['title', 'author', 'isFeatured', 'status', 'displayOrder'],
        editProperties: ['title', 'summary', 'content', 'imageUrl', 'author', 'authorPosition', 'authorCompany', 'companyLogoUrl', 'videoUrl', 'isFeatured', 'displayOrder', 'status'],
        filterProperties: ['author', 'authorCompany', 'isFeatured', 'status'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          summary: {
            type: 'textarea',
            props: {
              rows: 3
            }
          },
          content: {
            type: 'textarea',
            props: {
              rows: 8
            }
          }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/news') } },
          properties: { 
            key: 'imageUrl', 
            bucket: 'newsImages',
            file: 'imageFile',
            filePath: 'imageFilePath',
            filesToDelete: 'imageFilesToDelete'
          }
        }),
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/news') } },
          properties: { 
            key: 'companyLogoUrl', 
            bucket: 'companyLogos',
            file: 'logoFile',
            filePath: 'logoFilePath',
            filesToDelete: 'logoFilesToDelete'
          }
        })
      ]
    },
    {
      resource: NewsPageSettings,
      options: {
        parent: { name: 'News Management', icon: 'MessageSquare' },
        listProperties: ['mainHeading', 'socialHeading', 'updatedAt'],
        editProperties: [
          'mainHeading', 
          'mainHeadingHighlight', 
          'mainDescription', 
          'backgroundImageUrl',
          'socialHeading', 
          'socialHeadingHighlight', 
          'socialDescription', 
          'socialButtonText', 
          'socialMediaLink'
        ],
        sort: { sortBy: 'updatedAt', direction: 'desc' },
        properties: {
          mainDescription: {
            type: 'textarea',
            props: {
              rows: 4
            }
          },
          socialDescription: {
            type: 'textarea',
            props: {
              rows: 4
            }
          }
        },
        actions: {
          new: { isVisible: false }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/news') } },
          properties: { key: 'backgroundImageUrl', bucket: 'newsBackgrounds' }
        })
      ]
    },
    // {
    //   resource: Platform,
    //   options: {
    //     parent: { name: 'Product Management', icon: 'Package' },
    //     listProperties: ['platformName', 'platformKey', 'status', 'displayOrder'],
    //     editProperties: ['platformName', 'description', 'features', 'images', 'platformKey', 'technicalSpecs', 'benefits', 'displayOrder', 'status'],
    //     filterProperties: ['status'],
    //     sort: { sortBy: 'displayOrder', direction: 'asc' },
    //     properties: {
    //       description: {
    //         type: 'textarea',
    //         props: {
    //           rows: 4
    //         }
    //       },
    //       features: {
    //         type: 'textarea',
    //         props: {
    //           rows: 6,
    //           placeholder: 'Enter features as JSON array, e.g., ["Feature 1", "Feature 2"]'
    //         }
    //       },
    //       images: {
    //         type: 'textarea',
    //         props: {
    //           rows: 4,
    //           placeholder: 'Enter image URLs as JSON array, e.g., ["/images/img1.jpg", "/images/img2.jpg"]'
    //         }
    //       },
    //       technicalSpecs: {
    //         type: 'textarea',
    //         props: {
    //           rows: 5,
    //           placeholder: 'Enter technical specs as JSON array, e.g., ["Spec 1", "Spec 2"]'
    //         }
    //       },
    //       benefits: {
    //         type: 'textarea',
    //         props: {
    //           rows: 5,
    //           placeholder: 'Enter benefits as JSON array, e.g., ["Benefit 1", "Benefit 2"]'
    //         }
    //       }
    //     }
    //   }
    // },
    // Platforms Management
    {
      resource: ProductPlatform,
      options: {
        parent: { name: 'Platforms', icon: 'Layers' },
        listProperties: ['platformId', 'name', 'displayOrder', 'isActive'],
        editProperties: ['platformId', 'name', 'logoUrl', 'description', 'displayOrder', 'isActive'],
        filterProperties: ['isActive'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          platformId: {
            description: 'Unique identifier: Consensus, CoddleOnline, Rhythms24x7'
          },
          description: {
            type: 'textarea',
            props: { rows: 5 }
          },
          logoUrl: {
            description: 'Enter logo path or full URL from upload tool'
          }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/product-details/platform-logos') } },
          properties: { key: 'logoUrl', bucket: 'platformLogos' }
        })
      ]
    },
    {
      resource: PlatformFeature,
      options: {
        parent: { name: 'Platforms', icon: 'Layers' },
        listProperties: ['platformId', 'title'],
        editProperties: ['platformId', 'iconUrl', 'title', 'description'],
        filterProperties: ['platformId'],
        properties: {
          platformId: {
            description: 'Must match platform ID: Consensus, CoddleOnline, or Rhythms24x7'
          },
          description: {
            type: 'textarea',
            props: { rows: 3 }
          },
          iconUrl: {
            description: 'Enter icon path or full URL from upload tool'
          }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/product-details/features') } },
          properties: { key: 'iconUrl', bucket: 'featureIcons' }
        })
      ]
    },
    {
      resource: PlatformImage,
      options: {
        parent: { name: 'Platforms', icon: 'Layers' },
        listProperties: ['platformId', 'altText', 'displayOrder'],
        editProperties: ['platformId', 'imageUrl', 'altText', 'displayOrder'],
        filterProperties: ['platformId'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          platformId: {
            description: 'Must match platform ID: Consensus, CoddleOnline, or Rhythms24x7'
          },
          imageUrl: {
            description: 'Enter image path or full URL from upload tool'
          }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/product-details/platform-images') } },
          properties: { key: 'imageUrl', bucket: 'platformImages' }
        })
      ]
    },
    {
      resource: ProductContentSection,
      options: {
        parent: { name: 'Platforms', icon: 'Layers' },
        listProperties: ['sectionKey', 'titleMain', 'titleHighlight', 'isActive'],
        editProperties: ['sectionKey', 'titleMain', 'titleHighlight', 'imageUrl', 'description', 'isActive'],
        filterProperties: ['isActive'],
        properties: {
          sectionKey: {
            description: 'Section identifier: how_it_works, achieve, target_audience, deployment, solutions'
          },
          description: {
            type: 'textarea',
            props: { rows: 3 }
          },
          imageUrl: {
            description: 'Enter image path or full URL from upload tool (optional)'
          }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/product-details/sections') } },
          properties: { key: 'imageUrl', bucket: 'sectionImages' }
        })
      ]
    },
    {
      resource: ProductAchievement,
      options: {
        parent: { name: 'Platforms', icon: 'Layers' },
        listProperties: ['title', 'displayOrder', 'isActive'],
        editProperties: ['iconUrl', 'title', 'description', 'displayOrder', 'isActive'],
        filterProperties: ['isActive'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          description: {
            type: 'textarea',
            props: { rows: 3 }
          },
          iconUrl: {
            description: 'Enter icon path or full URL from upload tool'
          }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/product-details/achievements') } },
          properties: { key: 'iconUrl', bucket: 'achievementIcons' }
        })
      ]
    },
    {
      resource: ProductTargetAudience,
      options: {
        parent: { name: 'Platforms', icon: 'Layers' },
        listProperties: ['title', 'displayOrder', 'isActive'],
        editProperties: ['imageUrl', 'title', 'description', 'displayOrder', 'isActive'],
        filterProperties: ['isActive'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          description: {
            type: 'textarea',
            props: { rows: 3 }
          },
          imageUrl: {
            description: 'Enter image path or full URL from upload tool'
          }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/product-details/audiences') } },
          properties: { key: 'imageUrl', bucket: 'audienceImages' }
        })
      ]
    },
    {
      resource: ProductDeploymentOption,
      options: {
        parent: { name: 'Platforms', icon: 'Layers' },
        listProperties: ['title', 'displayOrder', 'isActive'],
        editProperties: ['iconUrl', 'title', 'displayOrder', 'isActive'],
        filterProperties: ['isActive'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          iconUrl: {
            description: 'Enter icon path or full URL from upload tool'
          }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/product-details/deployments') } },
          properties: { key: 'iconUrl', bucket: 'deploymentIcons' }
        })
      ]
    },
    {
      resource: DeploymentPlatformMapping,
      options: {
        parent: { name: 'Platforms', icon: 'Layers' },
        listProperties: ['deploymentOptionId', 'platformId'],
        editProperties: ['deploymentOptionId', 'platformId'],
        filterProperties: ['platformId'],
        properties: {
          deploymentOptionId: {
            description: 'Select deployment option ID from ProductDeploymentOption table'
          },
          platformId: {
            description: 'Must match platform ID: Consensus, CoddleOnline, or Rhythms24x7'
          }
        }
      }
    },
    {
      resource: ProductSolution,
      options: {
        parent: { name: 'Platforms', icon: 'Layers' },
        listProperties: ['platformId', 'title', 'displayOrder', 'isActive'],
        editProperties: ['platformId', 'imageUrl', 'title', 'description', 'displayOrder', 'isActive'],
        filterProperties: ['platformId', 'isActive'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          platformId: {
            description: 'Typically CoddleOnline, but can be any platform ID'
          },
          description: {
            type: 'textarea',
            props: { rows: 3 }
          },
          imageUrl: {
            description: 'Enter image path or full URL from upload tool'
          }
        }
      },
      features: [
        uploadFeature({
          provider: { local: { bucket: path.join(__dirname, '../../uploads/product-details/solutions') } },
          properties: { key: 'imageUrl', bucket: 'solutionImages' }
        })
      ]
    },
    {
      resource: ProductCTASection,
      options: {
        parent: { name: 'Platforms', icon: 'Layers' },
        listProperties: ['platformId', 'title'],
        editProperties: ['platformId', 'title', 'description', 'buttonText', 'buttonLink'],
        filterProperties: ['platformId'],
        properties: {
          platformId: {
            description: 'Must match platform ID: Consensus, CoddleOnline, or Rhythms24x7'
          },
          description: {
            type: 'textarea',
            props: { rows: 3 }
          },
          buttonLink: {
            description: 'URL for the CTA button (e.g., /contact-us)'
          }
        }
      }
    },
    // Home Page Management
    {
      resource: HomeHero,
      options: {
        parent: { name: 'Home Page', icon: 'Home' },
        listProperties: ['mainTitle', 'subTitle', 'mainText', 'isActive'],
        editProperties: ['mainTitle', 'subTitle', 'mainText', 'description', 'buttonText', 'image', 'isActive'],
        properties: {
          description: {
            type: 'textarea',
            props: { rows: 3 }
          },
          image: {
            description: 'Enter image path (e.g., /images/home-img.png) or full URL from upload tool'
          }
        }
      }
    },
    {
      resource: HomeFeatures,
      options: {
        parent: { name: 'Home Page', icon: 'Home' },
        listProperties: ['sectionTitle', 'sectionSubtitle', 'isActive'],
        editProperties: ['sectionTitle', 'sectionSubtitle', 'feature1Title', 'feature2Title', 'feature3Title', 'feature4Title', 'isActive']
      }
    },
    {
      resource: HomeChallenges,
      options: {
        parent: { name: 'Home Page', icon: 'Home' },
        listProperties: ['sectionTitle', 'sectionHighlight', 'isActive'],
        editProperties: ['sectionTitle', 'sectionHighlight', 'description', 'isActive'],
        properties: {
          description: {
            type: 'textarea',
            props: { rows: 3 }
          }
        }
      }
    },
    {
      resource: HomeChallengeItem,
      options: {
        parent: { name: 'Home Page', icon: 'Home' },
        listProperties: ['number', 'title', 'displayOrder', 'isActive'],
        editProperties: ['challengeId', 'number', 'title', 'description', 'displayOrder', 'isActive'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          description: {
            type: 'textarea',
            props: { rows: 3 }
          },
          challengeId: {
            description: 'Must match the ID of the Challenge section (usually 1)'
          }
        }
      }
    },
    {
      resource: HomeEcosystem,
      options: {
        parent: { name: 'Home Page', icon: 'Home' },
        listProperties: ['sectionTitle', 'sectionHighlight', 'isActive'],
        editProperties: ['sectionTitle', 'sectionHighlight', 'description', 'isActive'],
        properties: {
          description: {
            type: 'textarea',
            props: { rows: 3 }
          }
        }
      }
    },
    {
      resource: HomeEcosystemItem,
      options: {
        parent: { name: 'Home Page', icon: 'Home' },
        listProperties: ['title', 'type', 'link', 'displayOrder', 'isActive'],
        editProperties: ['ecosystemId', 'title', 'description', 'image', 'link', 'type', 'displayOrder', 'isActive'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          description: {
            type: 'textarea',
            props: { rows: 2 }
          },
          ecosystemId: {
            description: 'Must match the ID of the Ecosystem section (usually 1)'
          },
          type: {
            availableValues: [
              { value: 'large', label: 'Large' },
              { value: 'small', label: 'Small' }
            ]
          },
          image: {
            description: 'Enter image path (e.g., /images/desktop-mockup.svg) or full URL'
          }
        }
      }
    },
    {
      resource: HomeTargetAudience,
      options: {
        parent: { name: 'Home Page', icon: 'Home' },
        listProperties: ['sectionTitle', 'sectionHighlight', 'isActive'],
        editProperties: ['sectionTitle', 'sectionHighlight', 'description', 'isActive'],
        properties: {
          description: {
            type: 'textarea',
            props: { rows: 3 }
          }
        }
      }
    },
    {
      resource: HomeTargetAudienceTab,
      options: {
        parent: { name: 'Home Page', icon: 'Home' },
        listProperties: ['tabId', 'title', 'displayOrder', 'isActive'],
        editProperties: ['audienceId', 'tabId', 'title', 'image', 'description', 'displayOrder', 'isActive'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          description: {
            type: 'textarea',
            props: { rows: 2 },
            description: 'This field is mapped to "desc" in API response'
          },
          audienceId: {
            description: 'Must match the ID of the Target Audience section (usually 1)'
          },
          tabId: {
            description: 'Unique identifier for the tab (e.g., clinics, hospitals, phc)'
          },
          image: {
            description: 'Enter image path (e.g., /images/benyamin.png) - This field is mapped to "img" in API'
          }
        }
      }
    },
    {
      resource: HomeCompanyLogos,
      options: {
        parent: { name: 'Home Page', icon: 'Home' },
        listProperties: ['sectionTitle', 'sectionSubtitle', 'isActive'],
        editProperties: ['sectionTitle', 'sectionSubtitle', 'isActive']
      }
    },
    {
      resource: HomeCompanyLogoItem,
      options: {
        parent: { name: 'Home Page', icon: 'Home' },
        listProperties: ['companyName', 'displayOrder', 'isActive'],
        editProperties: ['logoSectionId', 'companyName', 'logoImage', 'displayOrder', 'isActive'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          logoSectionId: {
            description: 'Must match the ID of the Company Logos section (usually 1)'
          },
          logoImage: {
            description: 'Enter image path (e.g., /images/Google.png) or full URL from upload tool'
          }
        }
      }
    },
    {
      resource: HomeTestimonials,
      options: {
        parent: { name: 'Home Page', icon: 'Home' },
        listProperties: ['sectionTitle', 'sectionHighlight', 'isActive'],
        editProperties: ['sectionTitle', 'sectionHighlight', 'description', 'isActive'],
        properties: {
          description: {
            type: 'textarea',
            props: { rows: 3 }
          }
        }
      }
    },
    {
      resource: HomeTestimonialItem,
      options: {
        parent: { name: 'Home Page', icon: 'Home' },
        listProperties: ['name', 'title', 'displayOrder', 'isActive'],
        editProperties: ['testimonialSectionId', 'profileImage', 'title', 'description', 'name', 'position', 'displayOrder', 'isActive'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          description: {
            type: 'textarea',
            props: { rows: 3 }
          },
          testimonialSectionId: {
            description: 'Must match the ID of the Testimonials section (usually 1)'
          },
          profileImage: {
            description: 'Enter image path (e.g., /images/profile.svg) or full URL from upload tool'
          }
        }
      }
    },
    {
      resource: HomeCTA,
      options: {
        parent: { name: 'Home Page', icon: 'Home' },
        listProperties: ['title', 'buttonText', 'isActive'],
        editProperties: ['title', 'buttonText', 'buttonLink', 'image', 'isActive'],
        properties: {
          image: {
            description: 'Enter image path (e.g., /images/home-image.svg) or full URL from upload tool'
          }
        }
      }
    },
    // About Page Management
    {
      resource: AboutPageSettings,
      options: {
        parent: { name: 'About Page', icon: 'Info' },
        listProperties: ['headerTitle', 'headerSubtitle', 'isActive'],
        editProperties: [
          'headerTitle', 'headerSubtitle',
          'companyDescription', 'companyImage',
          'missionTitle', 'missionHighlight', 'missionDescription', 'missionImage',
          'statisticsTitle', 'statisticsHighlight', 'statisticsDescription',
          'teamTitle', 'teamHighlight', 'teamDescription',
          'contactTitle', 'contactHighlight', 'contactEmail', 'contactPhone', 'contactAddress',
          'isActive'
        ],
        properties: {
          companyDescription: {
            type: 'textarea',
            props: { rows: 4 }
          },
          companyImage: {
            description: 'Enter image path (e.g., /images/about-company.png) or full URL'
          },
          missionDescription: {
            type: 'textarea',
            props: { rows: 3 }
          },
          missionImage: {
            description: 'Enter image path (e.g., /images/world-map.svg) or full URL'
          },
          statisticsDescription: {
            type: 'textarea',
            props: { rows: 2 }
          },
          teamDescription: {
            type: 'textarea',
            props: { rows: 3 }
          },
          contactAddress: {
            type: 'textarea',
            props: { rows: 2 },
            description: 'Use \\n for line breaks'
          }
        }
      }
    },
    {
      resource: AboutMissionFeature,
      options: {
        parent: { name: 'About Page', icon: 'Info' },
        listProperties: ['title', 'displayOrder', 'isActive'],
        editProperties: ['title', 'description', 'icon', 'displayOrder', 'isActive'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          description: {
            type: 'textarea',
            props: { rows: 3 }
          },
          icon: {
            description: 'Enter icon path (e.g., /images/early-detection-icon.svg) or full URL'
          }
        }
      }
    },
    {
      resource: AboutStatistic,
      options: {
        parent: { name: 'About Page', icon: 'Info' },
        listProperties: ['title', 'number', 'symbol', 'displayOrder', 'isActive'],
        editProperties: ['number', 'symbol', 'title', 'description', 'displayOrder', 'isActive'],
        sort: { sortBy: 'displayOrder', direction: 'asc' },
        properties: {
          description: {
            type: 'textarea',
            props: { rows: 2 }
          },
          number: {
            description: 'The numeric value (e.g., 99, 32, 240)'
          },
          symbol: {
            description: 'Symbol to display after number (e.g., %, M, +)'
          }
        }
      }
    }
  ]
});

module.exports = adminJs;
