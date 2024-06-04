// backend/routes/api/index.js
const router = require('express').Router();

// CSRF restore route
router.get('/csrf/restore', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.status(200).json({});
});

// Test route
router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
