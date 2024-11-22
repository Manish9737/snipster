const Url = require('../models/Url');
const { isValidUrl } = require('../utils/urlValidator');

// POST: Shorten URL
const createShortUrl = async (req, res) => {
  const { originalUrl, expiresAt } = req.body;

  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return res.json(existingUrl);
    }

    const newUrl = await Url.create({ originalUrl, expiresAt });
    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET: Redirect to Original URL
const redirectToOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).json({ error: 'URL expired' });
    }

    url.clickCount += 1;
    await url.save();
    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET: Link Analytics
const getUrlAnalytics = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    res.json(url);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createShortUrl,
  redirectToOriginalUrl,
  getUrlAnalytics,
};
