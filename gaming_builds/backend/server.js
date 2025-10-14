const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'gaming_portal_secret_key';

// PostgreSQL connection
const pool = new Pool({
  connectionString: 'postgres://postgres:password@localhost:5432/complete_gaming_portal',
  ssl: false
});

// Middleware
app.use(cors());
app.use(express.json());

// -----------------------------------------------------------
// 🎮 GAMING API ROUTES
// -----------------------------------------------------------

// Get all games for user
app.get('/api/games/all', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM games WHERE user_id = $1 ORDER BY last_played DESC',
      [req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// Get all achievements for user
app.get('/api/achievements/all', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM achievements WHERE user_id = $1 ORDER BY unlocked DESC, name ASC',
      [req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

// Get friends for user
app.get('/api/friends/all', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT f.*, u.username, u.email 
      FROM friends f 
      JOIN users u ON f.friend_id = u.id 
      WHERE f.user_id = $1 
      ORDER BY f.status DESC, u.username ASC
    `, [req.userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Get friends error:', error);
    res.status(500).json({ error: 'Failed to fetch friends' });
  }
});

// -----------------------------------------------------------
// 🔐 AUTH ROUTES
// -----------------------------------------------------------

// Signup Route
app.post('/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if user exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create user
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, password] // In production, hash the password!
    );
    
    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    
    res.json({ token, user });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password] // In production, use hashed passwords!
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get User Data
app.get('/user/data', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, created_at FROM users WHERE id = $1',
      [req.userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// -----------------------------------------------------------
// 🎮 OAUTH ROUTES
// -----------------------------------------------------------

app.get('/auth/xbox', (req, res) => {
  res.json({ message: 'Xbox OAuth would redirect here' });
});

app.get('/auth/steam', (req, res) => {
  res.json({ message: 'Steam OAuth would redirect here' });
});

app.get('/auth/epic', (req, res) => {
  res.json({ message: 'Epic Games OAuth would redirect here' });
});

app.get('/auth/playstation', (req, res) => {
  res.json({ message: 'PlayStation OAuth would redirect here' });
});

// -----------------------------------------------------------
// 🛡️ MIDDLEWARE
// -----------------------------------------------------------

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
}

// -----------------------------------------------------------
// 🗄️ DATABASE SETUP
// -----------------------------------------------------------

async function setupDatabase() {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create games table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        platform VARCHAR(50) NOT NULL,
        playtime DECIMAL(10,2) DEFAULT 0,
        last_played TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create achievements table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS achievements (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        platform VARCHAR(50) NOT NULL,
        game_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        unlocked BOOLEAN DEFAULT FALSE,
        unlocked_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create friends table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS friends (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        friend_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, friend_id)
      )
    `);
    
    // Insert sample data for development
    await insertSampleData();
    
    console.log('✅ Database tables created/verified');
  } catch (error) {
    console.error('❌ Database setup error:', error);
  }
}

async function insertSampleData() {
  try {
    // Check if sample data already exists
    const userCheck = await pool.query('SELECT COUNT(*) FROM users WHERE email = $1', ['demo@gamingportal.com']);
    if (parseInt(userCheck.rows[0].count) > 0) {
      return; // Sample data already exists
    }
    
    // Insert sample user
    const userResult = await pool.query(`
      INSERT INTO users (username, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING id
    `, ['DemoGamer', 'demo@gamingportal.com', 'demo123']);
    
    const userId = userResult.rows[0].id;
    
    // Insert sample games
    await pool.query(`
      INSERT INTO games (user_id, name, platform, playtime, last_played) VALUES
      ($1, 'Cyberpunk 2077', 'Steam', 89.5, '2024-10-08'),
      ($1, 'Halo Infinite', 'Xbox', 45.2, '2024-10-07'),
      ($1, 'God of War', 'PlayStation', 32.1, '2024-10-06'),
      ($1, 'Fortnite', 'Epic', 156.8, '2024-10-09')
    `, [userId]);
    
    // Insert sample achievements
    await pool.query(`
      INSERT INTO achievements (user_id, platform, game_id, name, unlocked, unlocked_at) VALUES
      ($1, 'Steam', 'cyberpunk2077', 'First Blood', true, '2024-10-01'),
      ($1, 'Steam', 'cyberpunk2077', 'Night City Legend', false, null),
      ($1, 'Xbox', 'haloinfinite', 'Master Chief', true, '2024-09-15'),
      ($1, 'PlayStation', 'godofwar', 'God Slayer', true, '2024-09-20'),
      ($1, 'Epic', 'fortnite', 'Victory Royale', true, '2024-10-05')
    `, [userId]);
    
    console.log('✅ Sample data inserted');
  } catch (error) {
    console.error('⚠️ Sample data insertion error:', error);
  }
}

// -----------------------------------------------------------
// 🚀 SERVER START
// -----------------------------------------------------------

app.listen(PORT, async () => {
  console.log(`🎮 Gaming Portal Backend running on http://localhost:${PORT}`);
  await setupDatabase();
});

module.exports = app;