const express = require('express');
const { NewsArticle, NewsPageSettings } = require('../models');
const router = express.Router();

// GET /api/news/pages - Get complete news page content
router.get('/pages', async (req, res) => {
  try {
    // Get page settings and articles
    const [pageSettings, featuredArticle, newsArticles] = await Promise.all([
      NewsPageSettings.findOne(),
      NewsArticle.findOne({
        where: { 
          isFeatured: true,
          status: 'published' 
        }
      }),
      NewsArticle.findAll({
        where: { 
          status: 'published'
        },
        order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']],
        limit: 4
      })
    ]);

    if (!pageSettings) {
      return res.status(404).json({ error: 'News page settings not found' });
    }

    res.json({
      mainSection: {
        heading: pageSettings.mainHeading,
        headingHighlight: pageSettings.mainHeadingHighlight,
        description: pageSettings.mainDescription
      },
      featuredArticle: featuredArticle ? {
        id: featuredArticle.id,
        title: featuredArticle.title,
        content: featuredArticle.content,
        imageUrl: featuredArticle.imageUrl,
        author: featuredArticle.author,
        authorPosition: featuredArticle.authorPosition,
        authorCompany: featuredArticle.authorCompany,
        companyLogoUrl: featuredArticle.companyLogoUrl,
        videoUrl: featuredArticle.videoUrl
      } : null,
      socialSection: {
        heading: pageSettings.socialHeading,
        headingHighlight: pageSettings.socialHeadingHighlight,
        description: pageSettings.socialDescription,
        buttonText: pageSettings.socialButtonText,
        socialMediaLink: pageSettings.socialMediaLink
      },
      newsArticles: newsArticles.map(article => ({
        id: article.id,
        title: article.title,
        summary: article.summary,
        content: article.content,
        imageUrl: article.imageUrl,
        author: article.author,
        authorPosition: article.authorPosition,
        authorCompany: article.authorCompany
      }))
    });
  } catch (error) {
    console.error('Error fetching news page content:', error);
    res.status(500).json({ 
      error: 'Failed to fetch news page content',
      message: error.message 
    });
  }
});

// PUT /api/news/pages/main-section - Update main section
router.put('/pages/main-section', async (req, res) => {
  try {
    const { heading, headingHighlight, description } = req.body;
    
    let pageSettings = await NewsPageSettings.findOne();
    if (!pageSettings) {
      pageSettings = await NewsPageSettings.create({});
    }

    await pageSettings.update({
      mainHeading: heading,
      mainHeadingHighlight: headingHighlight,
      mainDescription: description
    });

    res.json({
      heading: pageSettings.mainHeading,
      headingHighlight: pageSettings.mainHeadingHighlight,
      description: pageSettings.mainDescription
    });
  } catch (error) {
    console.error('Error updating main section:', error);
    res.status(500).json({ 
      error: 'Failed to update main section',
      message: error.message 
    });
  }
});

// PUT /api/news/pages/social-section - Update social section
router.put('/pages/social-section', async (req, res) => {
  try {
    const { heading, headingHighlight, description, buttonText, socialMediaLink } = req.body;
    
    let pageSettings = await NewsPageSettings.findOne();
    if (!pageSettings) {
      pageSettings = await NewsPageSettings.create({});
    }

    await pageSettings.update({
      socialHeading: heading,
      socialHeadingHighlight: headingHighlight,
      socialDescription: description,
      socialButtonText: buttonText,
      socialMediaLink: socialMediaLink
    });

    res.json({
      heading: pageSettings.socialHeading,
      headingHighlight: pageSettings.socialHeadingHighlight,
      description: pageSettings.socialDescription,
      buttonText: pageSettings.socialButtonText,
      socialMediaLink: pageSettings.socialMediaLink
    });
  } catch (error) {
    console.error('Error updating social section:', error);
    res.status(500).json({ 
      error: 'Failed to update social section',
      message: error.message 
    });
  }
});

// PUT /api/news/pages/featured-article - Update featured article
router.put('/pages/featured-article', async (req, res) => {
  try {
    const { articleId } = req.body;
    
    // First, unset any existing featured article
    await NewsArticle.update(
      { isFeatured: false },
      { where: { isFeatured: true } }
    );

    // Set the new featured article
    const article = await NewsArticle.findByPk(articleId);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await article.update({ isFeatured: true });

    res.json({
      id: article.id,
      title: article.title,
      content: article.content,
      imageUrl: article.imageUrl,
      author: article.author,
      authorPosition: article.authorPosition,
      authorCompany: article.authorCompany,
      companyLogoUrl: article.companyLogoUrl,
      videoUrl: article.videoUrl
    });
  } catch (error) {
    console.error('Error updating featured article:', error);
    res.status(500).json({ 
      error: 'Failed to update featured article',
      message: error.message 
    });
  }
});

// GET /api/news-articles - Get news articles with pagination
router.get('/news-articles', async (req, res) => {
  try {
    const { page = 1, limit = 10, featured } = req.query;
    
    const whereClause = { status: 'published' };
    if (featured !== undefined) {
      whereClause.isFeatured = featured === 'true';
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    const { count, rows: articles } = await NewsArticle.findAndCountAll({
      where: whereClause,
      order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });

    res.json({
      articles: articles.map(article => ({
        id: article.id,
        title: article.title,
        summary: article.summary,
        content: article.content,
        imageUrl: article.imageUrl,
        author: article.author,
        authorPosition: article.authorPosition,
        authorCompany: article.authorCompany
      })),
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / parseInt(limit)),
        totalItems: count,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching news articles:', error);
    res.status(500).json({ 
      error: 'Failed to fetch news articles',
      message: error.message 
    });
  }
});

// POST /api/news-articles - Create news article
router.post('/news-articles', async (req, res) => {
  try {
    const {
      title,
      summary,
      content,
      imageUrl,
      author,
      authorPosition,
      authorCompany,
      companyLogoUrl,
      videoUrl,
      displayOrder,
      status
    } = req.body;

    const article = await NewsArticle.create({
      title,
      summary,
      content,
      imageUrl,
      author,
      authorPosition,
      authorCompany,
      companyLogoUrl,
      videoUrl,
      displayOrder: displayOrder || 0,
      status: status || 'draft'
    });

    res.status(201).json({
      id: article.id,
      title: article.title,
      summary: article.summary,
      content: article.content,
      imageUrl: article.imageUrl,
      author: article.author,
      authorPosition: article.authorPosition,
      authorCompany: article.authorCompany,
      companyLogoUrl: article.companyLogoUrl,
      videoUrl: article.videoUrl,
      displayOrder: article.displayOrder,
      status: article.status
    });
  } catch (error) {
    console.error('Error creating news article:', error);
    res.status(500).json({ 
      error: 'Failed to create news article',
      message: error.message 
    });
  }
});

// PUT /api/news-articles/:id - Update news article
router.put('/news-articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const article = await NewsArticle.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await article.update(updateData);

    res.json({
      id: article.id,
      title: article.title,
      summary: article.summary,
      content: article.content,
      imageUrl: article.imageUrl,
      author: article.author,
      authorPosition: article.authorPosition,
      authorCompany: article.authorCompany,
      companyLogoUrl: article.companyLogoUrl,
      videoUrl: article.videoUrl,
      displayOrder: article.displayOrder,
      status: article.status
    });
  } catch (error) {
    console.error('Error updating news article:', error);
    res.status(500).json({ 
      error: 'Failed to update news article',
      message: error.message 
    });
  }
});

// DELETE /api/news-articles/:id - Delete news article
router.delete('/news-articles/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const article = await NewsArticle.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    await article.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting news article:', error);
    res.status(500).json({ 
      error: 'Failed to delete news article',
      message: error.message 
    });
  }
});

module.exports = router;
