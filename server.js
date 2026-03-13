const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');

const API_KEY = 'ccc12e9508e68e923cd1f0d502d3ea23';
const PORT = 3000;

// Proxy OWM API — avoids all CORS issues
function fetchOWM(endpoint, callback) {
  const options = {
    hostname: 'api.openweathermap.org',
    path: `/data/2.5/${endpoint}&appid=${API_KEY}`,
    method: 'GET',
    headers: { 'User-Agent': 'CloudBurstIndia/1.0' }
  };
  https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => callback(null, res.statusCode, data));
  }).on('error', err => callback(err));
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  // ── API proxy routes ──────────────────────────────────────────────────
  if (pathname === '/api/weather') {
    const city = parsed.query.city;
    if (!city) { res.writeHead(400); res.end(JSON.stringify({error:'city required'})); return; }
    fetchOWM(`weather?q=${encodeURIComponent(city)},IN`, (err, status, data) => {
      if (err) { res.writeHead(500); res.end(JSON.stringify({error:'Network error: '+err.message})); return; }
      res.writeHead(status, {'Content-Type':'application/json'});
      res.end(data);
    });
    return;
  }

  if (pathname === '/api/forecast') {
    const city = parsed.query.city;
    if (!city) { res.writeHead(400); res.end(JSON.stringify({error:'city required'})); return; }
    fetchOWM(`forecast?q=${encodeURIComponent(city)},IN&cnt=56`, (err, status, data) => {
      if (err) { res.writeHead(500); res.end(JSON.stringify({error:'Network error: '+err.message})); return; }
      res.writeHead(status, {'Content-Type':'application/json'});
      res.end(data);
    });
    return;
  }

  // ── Serve index.html ──────────────────────────────────────────────────
  if (pathname === '/' || pathname === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, content) => {
      if (err) { res.writeHead(404); res.end('index.html not found'); return; }
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(content);
    });
    return;
  }

  res.writeHead(404); res.end('Not found');
});

server.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║     ⛈️  CloudBurst India — Server Running         ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log(`║  🌐 Open in browser:  http://localhost:${PORT}        ║`);
  console.log(`║  🔑 API Key:          ${API_KEY.slice(0,8)}...     ║`);
  console.log('║  ⏹  Stop server:      Ctrl + C                    ║');
  console.log('╚══════════════════════════════════════════════════╝\n');
});
