const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

const messages = [];
const orders = [];

app.post('/api/contact', (req, res) => {
  messages.push({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    date: new Date().toISOString()
  });
  res.json({status: 'ok'});
});

app.post('/api/order', (req, res) => {
  orders.push({
    name: req.body.name,
    email: req.body.email,
    product: req.body.product,
    quantity: req.body.quantity,
    date: new Date().toISOString()
  });
  res.json({status: 'ok'});
});

app.get('/admin', (req, res) => {
  let html = '<h1>Admin Panel</h1>'; 
  html += '<h2>Orders</h2><ul>' + orders.map(o => `<li>${o.date} - ${o.name} ordered ${o.quantity} ${o.product}(s)</li>`).join('') + '</ul>';
  html += '<h2>Messages</h2><ul>' + messages.map(m => `<li>${m.date} - ${m.name} (${m.email}): ${m.message}</li>`).join('') + '</ul>';
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
