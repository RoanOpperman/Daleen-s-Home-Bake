const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const messages = [];
const orders = [];

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, {'Content-Type': contentType});
    res.end(data);
  });
}

function handlePost(req, res, array) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      array.push({...data, date: new Date().toISOString()});
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({status: 'ok'}));
    } catch {
      res.writeHead(400);
      res.end('Bad request');
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/' || req.url === '/index.html') {
      return serveFile(res, path.join(__dirname, 'index.html'), 'text/html');
    }
    if (req.url === '/style.css') {
      return serveFile(res, path.join(__dirname, 'style.css'), 'text/css');
    }
    if (req.url.startsWith('/public/img/')) {
      const imgPath = path.join(__dirname, req.url);
      const ext = path.extname(imgPath).substring(1);
      return serveFile(res, imgPath, `image/${ext}`);
    }
    if (req.url === '/admin') {
      let html = '<h1>Admin Panel</h1>';
      html += '<h2>Orders</h2><ul>' + orders.map(o => `<li>${o.date} - ${o.name} ordered ${o.quantity} ${o.product}(s)</li>`).join('') + '</ul>';
      html += '<h2>Messages</h2><ul>' + messages.map(m => `<li>${m.date} - ${m.name} (${m.email}): ${m.message}</li>`).join('') + '</ul>';
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(html);
      return;
    }
    res.writeHead(404);
    res.end('Not found');
  } else if (req.method === 'POST') {
    if (req.url === '/api/contact') {
      return handlePost(req, res, messages);
    }
    if (req.url === '/api/order') {
      return handlePost(req, res, orders);
    }
    res.writeHead(404);
    res.end('Not found');
  } else {
    res.writeHead(405);
    res.end('Method not allowed');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
