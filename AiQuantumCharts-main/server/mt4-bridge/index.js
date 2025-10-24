// MT4 Webhook Bridge (Node.js Express Stub)
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.MT4_BRIDGE_PORT || 8088;

app.use(cors());
app.use(express.json());

// Webhook endpoint for MT4 alerts
app.post('/mt4-webhook', (req, res) => {
  const payload = req.body;
  console.log('[MT4 Webhook] Received:', JSON.stringify(payload));
  // TODO: Add authentication, validation, and forwarding logic as needed
  res.status(200).json({ status: 'ok', received: true });
});

app.get('/', (req, res) => {
  res.send('MT4 Webhook Bridge is running.');
});

app.listen(PORT, () => {
  console.log(`MT4 Webhook Bridge listening on port ${PORT}`);
});
