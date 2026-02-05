const sequelize = require('../config/database');

// Import simplified models
const ContentItem = require('./ContentItem');
const TeamMember = require('./TeamMember');
const Product = require('./Product');
const CompanyLogo = require('./CompanyLogo');
const FormSubmission = require('./FormSubmission');
const MenuItem = require('./MenuItem');
const NewsArticle = require('./NewsArticle');
const NewsPageSettings = require('./NewsPageSettings');
const Platform = require('./Platform');

// Import Product Details models
const ProductPlatform = require('./ProductPlatform');
const PlatformFeature = require('./PlatformFeature');
const PlatformImage = require('./PlatformImage');
const ProductContentSection = require('./ProductContentSection');
const ProductAchievement = require('./ProductAchievement');
const ProductTargetAudience = require('./ProductTargetAudience');
const { ProductDeploymentOption, DeploymentPlatformMapping } = require('./ProductDeploymentOption');
const ProductSolution = require('./ProductSolution');
const ProductCTASection = require('./ProductCTASection');

// Import Home Page models
const HomeHero = require('./HomeHero');
const HomeFeatures = require('./HomeFeatures');
const { HomeChallenges, HomeChallengeItem } = require('./HomeChallenges');
const { HomeEcosystem, HomeEcosystemItem } = require('./HomeEcosystem');
const { HomeTargetAudience, HomeTargetAudienceTab } = require('./HomeTargetAudience');
const { HomeCompanyLogos, HomeCompanyLogoItem } = require('./HomeCompanyLogos');
const { HomeTestimonials, HomeTestimonialItem } = require('./HomeTestimonials');
const HomeCTA = require('./HomeCTA');

// Import About Page models
const AboutPageSettings = require('./AboutPageSettings');
const AboutMissionFeature = require('./AboutMissionFeature');
const AboutStatistic = require('./AboutStatistic');
const ContactDetails = require('./ContactDetails');

// No relationships needed for the simplified schema

// Define relationships for dynamic AdminJS dropdowns
// This tells AdminJS to fetch available platforms from the database and use platformId (string) as the link
ProductPlatform.hasMany(PlatformFeature, { foreignKey: 'platformId', sourceKey: 'platformId' });
PlatformFeature.belongsTo(ProductPlatform, { foreignKey: 'platformId', targetKey: 'platformId' });

ProductPlatform.hasMany(PlatformImage, { foreignKey: 'platformId', sourceKey: 'platformId' });
PlatformImage.belongsTo(ProductPlatform, { foreignKey: 'platformId', targetKey: 'platformId' });

ProductPlatform.hasMany(ProductSolution, { foreignKey: 'platformId', sourceKey: 'platformId' });
ProductSolution.belongsTo(ProductPlatform, { foreignKey: 'platformId', targetKey: 'platformId' });

ProductPlatform.hasMany(ProductCTASection, { foreignKey: 'platformId', sourceKey: 'platformId' });
ProductCTASection.belongsTo(ProductPlatform, { foreignKey: 'platformId', targetKey: 'platformId' });

ProductPlatform.hasMany(DeploymentPlatformMapping, { foreignKey: 'platformId', sourceKey: 'platformId' });
DeploymentPlatformMapping.belongsTo(ProductPlatform, { foreignKey: 'platformId', targetKey: 'platformId' });

// Add new platform-specific associations
ProductPlatform.hasMany(ProductContentSection, { foreignKey: 'platformId', sourceKey: 'platformId' });
ProductContentSection.belongsTo(ProductPlatform, { foreignKey: 'platformId', targetKey: 'platformId' });

ProductPlatform.hasMany(ProductAchievement, { foreignKey: 'platformId', sourceKey: 'platformId' });
ProductAchievement.belongsTo(ProductPlatform, { foreignKey: 'platformId', targetKey: 'platformId' });

ProductPlatform.hasMany(ProductTargetAudience, { foreignKey: 'platformId', sourceKey: 'platformId' });
ProductTargetAudience.belongsTo(ProductPlatform, { foreignKey: 'platformId', targetKey: 'platformId' });

ProductPlatform.hasMany(ProductDeploymentOption, { foreignKey: 'platformId', sourceKey: 'platformId' });
ProductDeploymentOption.belongsTo(ProductPlatform, { foreignKey: 'platformId', targetKey: 'platformId' });

// Export all models and sequelize instance
module.exports = {
  sequelize,
  ContactDetails,
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
};
