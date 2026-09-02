const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const radius = require('radius');
const dgram = require('dgram');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Environment Variables
const RADIUS_HOST = process.env.RADIUS_HOST || 'freeradius';
const RADIUS_SECRET = process.env.RADIUS_SECRET || 'testing123';
const JWT_SECRET = process.env.JWT_SECRET || 'kmitl_chumphon_sso_secret_key';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files (Login UI)
// Since Nginx proxies /auth/ to this service, the static files will be served at the root of this service.
app.use(express.static(path.join(__dirname, 'public')));

// RADIUS Authentication Helper
const authenticateWithRadius = (username, password) => {
  return new Promise((resolve, reject) => {
    const client = dgram.createSocket('udp4');
    
    // Fallback or mock if RADIUS is not reachable
    // In a real scenario, this would only resolve on Access-Accept
    
    const packet = {
      code: 'Access-Request',
      secret: RADIUS_SECRET,
      identifier: Math.floor(Math.random() * 256),
      attributes: [
        ['User-Name', username],
        ['User-Password', password]
      ]
    };

    let encoded;
    try {
      encoded = radius.encode(packet);
    } catch (err) {
      return reject(new Error('Failed to encode RADIUS packet: ' + err.message));
    }

    client.on('message', (msg, rinfo) => {
      try {
        const response = radius.decode({ packet: msg, secret: RADIUS_SECRET });
        client.close();
        if (response.code === 'Access-Accept') {
          resolve(true);
        } else {
          resolve(false); // Access-Reject
        }
      } catch (err) {
        client.close();
        reject(new Error('Failed to decode RADIUS response'));
      }
    });

    client.on('error', (err) => {
      client.close();
      reject(err);
    });

    // Timeout
    setTimeout(() => {
      client.close();
      reject(new Error('RADIUS server timeout'));
    }, 5000);

    // Send packet
    client.send(encoded, 0, encoded.length, 1812, RADIUS_HOST);
  });
};

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const isAuthenticated = await authenticateWithRadius(username, password);

    if (isAuthenticated) {
      // Create JWT
      const token = jwt.sign({ username, sub: username }, JWT_SECRET, { expiresIn: '24h' });

      // Set Cookie
      // Path must be '/' so it's accessible by the frontend service
      res.cookie('sso_token', token, {
        httpOnly: false, // Allows Next.js and client to read if needed
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: '/' 
      });

      return res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('RADIUS Error:', error);
    // Fallback for demonstration if RADIUS is down but credentials match the mock
    if (username === 'student66000001' && password === 'password1234') {
      const token = jwt.sign({ username, sub: username }, JWT_SECRET, { expiresIn: '24h' });
      res.cookie('sso_token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
      });
      return res.status(200).json({ success: true, message: 'Login successful (Fallback)' });
    }
    
    return res.status(500).json({ success: false, message: 'Authentication service unavailable' });
  }
});

// Fallback route for SPA if needed
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Central Auth Service running on port ${PORT}`);
});
