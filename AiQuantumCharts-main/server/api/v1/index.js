const express = require('express');
const router = express.Router();

// Example v1 endpoint
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API v1!' });
});

module.exports = router;
