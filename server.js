/* ==============================================
   STUBUU Proxy Server
   Routes AI requests from the published website
   through your laptop to local Ollama instance.
============================================== */

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// ============================================
// CONFIGURATION — Edit these as needed
// ============================================
const PORT = 3030;                          // Port this proxy listens on
const OLLAMA_URL = 'http://127.0.0.1:11434'; // Your local Ollama address

// ============================================
// MIDDLEWARE
// ============================================

// Enable CORS for all origins (so any published website can call this)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON bodies (needed for logging/rate limiting)
app.use(express.json({ limit: '1mb' }));

// Rate limiting — prevent abuse (100 requests per 15 minutes per IP)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { error: 'Too many requests. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// ============================================
// REQUEST LOGGING
// ============================================
app.use('/api/', (req, res, next) => {
    const timestamp = new Date().toLocaleString();
    const ip = req.ip || req.connection.remoteAddress;
    console.log(`[${timestamp}] ${req.method} ${req.path} from ${ip}`);
    next();
});

// ============================================
// PROXY ROUTES — Forward to Ollama
// ============================================

// Proxy /api/tags (list models)
app.use('/api/tags', createProxyMiddleware({
    target: OLLAMA_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/tags': '/api/tags' },
    onError: (err, req, res) => {
        console.error('Proxy error (tags):', err.message);
        res.status(502).json({ error: 'Ollama is not reachable. Make sure it is running.' });
    }
}));

// Proxy /api/chat (modern Ollama chat endpoint)
app.use('/api/chat', createProxyMiddleware({
    target: OLLAMA_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/chat': '/api/chat' },
    onProxyReq: (proxyReq, req) => {
        // Re-stream the body since express.json() already consumed it
        if (req.body) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    },
    onError: (err, req, res) => {
        console.error('Proxy error (chat):', err.message);
        res.status(502).json({ error: 'Ollama is not reachable. Make sure it is running.' });
    }
}));

// Proxy /api/generate (older Ollama generate endpoint)
app.use('/api/generate', createProxyMiddleware({
    target: OLLAMA_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/generate': '/api/generate' },
    onProxyReq: (proxyReq, req) => {
        if (req.body) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    },
    onError: (err, req, res) => {
        console.error('Proxy error (generate):', err.message);
        res.status(502).json({ error: 'Ollama is not reachable. Make sure it is running.' });
    }
}));

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        server: 'STUBUU Proxy',
        ollama: OLLAMA_URL,
        uptime: Math.floor(process.uptime()) + 's'
    });
});

// ============================================
// (OPTIONAL) SERVE STATIC WEBSITE FILES
// Uncomment these lines if you also want to
// serve your website from this same server.
// ============================================
// app.use(express.static(path.join(__dirname)));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// ============================================
// START SERVER
// ============================================
app.listen(PORT, '0.0.0.0', () => {
    console.log('');
    console.log('  ╔═══════════════════════════════════════════╗');
    console.log('  ║        STUBUU AI Proxy Server             ║');
    console.log('  ╠═══════════════════════════════════════════╣');
    console.log(`  ║  Proxy:    http://0.0.0.0:${PORT}            ║`);
    console.log(`  ║  Ollama:   ${OLLAMA_URL}     ║`);
    console.log('  ║  Status:   Running ✓                      ║');
    console.log('  ╚═══════════════════════════════════════════╝');
    console.log('');
    console.log('  Endpoints proxied:');
    console.log('    → /api/tags      (list models)');
    console.log('    → /api/chat      (chat completions)');
    console.log('    → /api/generate  (text generation)');
    console.log('    → /health        (server health check)');
    console.log('');
    console.log('  To make this accessible from the internet:');
    console.log('    1. Port forward port 3030 on your router, OR');
    console.log('    2. Run: npx ngrok http 3030');
    console.log('');
    console.log('  Waiting for requests...');
    console.log('');
});
