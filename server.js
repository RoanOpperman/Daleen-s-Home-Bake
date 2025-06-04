const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const ordersFile = path.join(__dirname, 'orders.json');
const messagesFile = path.join(__dirname, 'messages.json');

function appendData(file, data) {
  let arr = [];
  if (fs.existsSync(file)) {
    try {
      arr = JSON.parse(fs.readFileSync(file));
    } catch (e) {}
  }
  arr.push(data);
  fs.writeFileSync(file, JSON.stringify(arr, null, 2));
}

app.post('/order', (req, res) => {
  appendData(ordersFile, {
    name: req.body.name,
    email: req.body.email,
    product: req.body.product,
    quantity: req.body.quantity,
    message: req.body.message,
    date: new Date().toISOString(),
  });
  res.json({ status: 'ok' });
});

app.post('/contact', (req, res) => {
  appendData(messagesFile, {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    date: new Date().toISOString(),
  });
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
