const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

const quantumShield = require('../server/security/QuantumShield').default;
const quantumDefense = require('../server/security/QuantumDefense').default;

app.use(cors());
app.use(express.json());
app.use('/', quantumShield);
app.use('/', quantumDefense);

app.get('/', (req, res) => {
  res.send('AI Quantum Charts Local API Server Running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
