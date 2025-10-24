const cron = require('node-cron');
// --- Auto-Updater: Runs at 2PM Pacific Time (PT) daily ---
// PT = UTC-8 (Standard), UTC-7 (Daylight). We'll use UTC 22:00 for 2PM PT (Standard), 21:00 for Daylight. For simplicity, run at 22:00 UTC.
cron.schedule('0 22 * * *', () => {
  console.log('[AUTO-UPDATER] Running daily update for all charts and software at 2PM PT (22:00 UTC)');
  // TODO: Add logic to refresh chart data, push software updates, notify platforms, etc.
  // Example: refreshCharts(); pushUpdates(); notifyUsers();
}, {
  scheduled: true,
  timezone: 'Etc/UTC'
});
// API versioning
const apiV1 = require('./server/api/v1/index.js');
app.use('/api/v1', apiV1);

// Swagger docs endpoint
app.get('/api/docs', (req, res) => {
  res.sendFile(__dirname + '/server/swagger.yaml');
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

// --- WebSocket server for real-time collaboration ---
const http = require('http');
const { Server } = require('ws');
const server = http.createServer(app);
const wss = new Server({ server });

let chartState = null; // Shared chart state

wss.on('connection', (ws) => {
  // Send current chart state to new client
  if (chartState) ws.send(JSON.stringify({ type: 'init', data: chartState }));

  ws.on('message', (msg) => {
    try {
      const parsed = JSON.parse(msg);
      if (parsed.type === 'update') {
        chartState = parsed.data;
        // Broadcast to all clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === 1) {
            client.send(JSON.stringify({ type: 'update', data: chartState }));
          }
        });
      }
    } catch (e) { /* ignore */ }
  });
});


// Security & utility middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 })); // 100 req/min per IP

const quantumShield = require('./server/security/QuantumShield');


app.use(cors());
app.use(express.json());
app.use('/', quantumShield);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.get('/', (req, res) => {
  res.send('AI Quantum Charts Local API Server Running');
});


server.listen(PORT, () => {
  console.log(`Server & WebSocket running on http://localhost:${PORT}`);
});
