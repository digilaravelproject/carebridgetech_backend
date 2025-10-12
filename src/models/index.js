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

// No relationships needed for the simplified schema

// Export all models and sequelize instance
module.exports = {
  sequelize,
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
