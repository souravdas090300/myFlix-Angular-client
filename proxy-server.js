const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for all requests
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Proxy configuration
const apiProxy = createProxyMiddleware({
  target: 'https://ancient-woodland-05995-715624a89d87.herokuapp.com',
  changeOrigin: true,
  secure: true,
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying request: ${req.method} ${req.url}`);
    // Add necessary headers
    proxyReq.setHeader('Accept', 'application/json');
    if (req.body) {
      proxyReq.setHeader('Content-Type', 'application/json');
    }
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`Response from Heroku: ${proxyRes.statusCode} for ${req.method} ${req.url}`);
    // Add CORS headers to the response
    proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Accept';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

// Use the proxy for all API requests
app.use('/api', apiProxy);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Proxy server is running', target: 'https://ancient-woodland-05995-715624a89d87.herokuapp.com' });
});

app.listen(PORT, () => {
  console.log(`🚀 CORS Proxy Server running on http://localhost:${PORT}`);
  console.log(`📡 Proxying to: https://ancient-woodland-05995-715624a89d87.herokuapp.com`);
  console.log(`🌐 Allowing CORS from: http://localhost:4200`);
  console.log(`✅ Ready to handle API requests!`);
});
