// server/emailOAuth.js
// Express handler for OAuth2 callback and sending email

const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
const { emailProviders } = require('../src/authProviders');

const router = express.Router();

// Helper: get provider by name
function getProvider(name) {
  return emailProviders.find(p => p.name.toLowerCase() === name.toLowerCase());
}

// OAuth2 callback handler
router.get('/callback', async (req, res) => {
  const { code, provider } = req.query;
  if (!code || !provider) return res.status(400).send('Missing code or provider');
  const prov = getProvider(provider);
  if (!prov) return res.status(400).send('Unknown provider');

  try {
    // Exchange code for access token
    const tokenRes = await axios.post(prov.tokenUrl, {
      client_id: prov.clientId,
      client_secret: prov.clientSecret,
      redirect_uri: prov.redirectUri,
      code,
      grant_type: 'authorization_code',
    }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    const accessToken = tokenRes.data.access_token;
    // Optionally, send a test email
    // await sendMail(prov, accessToken);
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST /auth/send-test-email
router.post('/send-test-email', async (req, res) => {
  const { provider, accessToken } = req.body;
  const prov = getProvider(provider);
  if (!prov) return res.status(400).json({ error: 'Unknown provider' });
  try {
    const transporter = nodemailer.createTransport({
      service: prov.name.toLowerCase(),
      auth: {
        type: 'OAuth2',
        user: 'youremail@example.com', // TODO: replace with actual user
        accessToken,
        clientId: prov.clientId,
        clientSecret: prov.clientSecret,
        refreshToken: 'YOUR_REFRESH_TOKEN', // TODO: replace if needed
      },
    });
    await transporter.sendMail({
      from: 'youremail@example.com',
      to: 'target@example.com',
      subject: 'Hello from Quantum Desktop',
      text: 'This is a test email sent from your local desktop app!',
    });
    res.json({ status: 'sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
