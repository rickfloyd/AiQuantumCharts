const express = require('express');
const os = require('os');

const router = express.Router();

router.get('/api/status', (_, res) => {
  res.json({
    status: '🟢 Online',
    uptime: process.uptime().toFixed(0),
    hostname: os.hostname(),
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
