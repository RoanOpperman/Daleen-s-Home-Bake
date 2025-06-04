const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json'
};

function serveStatic(filePath, res) {
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not Found');
    }
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/api/messages') {
      const file = path.join(__dirname, 'data', 'messages.json');
      const data = fs.existsSync(file) ? fs.readFileSync(file) : '[]';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(data);
    }
    if (req.url === '/api/orders') {
      const file = path.join(__dirname, 'data', 'orders.json');
      const data = fs.existsSync(file) ? fs.readFileSync(file) : '[]';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(data);
    }

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    serveStatic(filePath, res);
  } else if (req.method === 'POST' && req.url === '/api/order') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const order = JSON.parse(body);
        order.timestamp = Date.now();
        const ordersFile = path.join(__dirname, 'data', 'orders.json');
        let orders = [];
        if (fs.existsSync(ordersFile)) {
          orders = JSON.parse(fs.readFileSync(ordersFile));
        }
        orders.push(order);
        fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
      } catch (e) {
        res.writeHead(500);
        res.end('Server error');
      }
    });
  } else if (req.method === 'POST' && req.url === '/api/contact') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const msg = JSON.parse(body);
        const file = path.join(__dirname, 'data', 'messages.json');
        let messages = [];
        if (fs.existsSync(file)) {
          messages = JSON.parse(fs.readFileSync(file));
        }
        messages.push(msg);
        fs.writeFileSync(file, JSON.stringify(messages, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
      } catch (e) {
        res.writeHead(500);
        res.end('Server error');
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
