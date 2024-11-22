const express = require('express');
const {
  createShortUrl,
  redirectToOriginalUrl,
  getUrlAnalytics,
} = require('../controllers/urlController');

const router = express.Router();

router.post('/shorten', createShortUrl);

router.get('/:shortCode', redirectToOriginalUrl);

router.get('/analytics/:shortCode', getUrlAnalytics);

module.exports = router;
