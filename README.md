# Deleen's Home Bake

A simple online bakery store built with Node.js and vanilla JavaScript. It lists products in a three-column grid, loops customer testimonials across the top, and allows visitors to place orders and send messages through a contact form. Orders store the customer's name, email and cart items in `data/orders.json` while messages are saved to `data/messages.json`.

## Getting Started

1. Start the server:
   ```bash
   node server.js
   ```
2. Open your browser at `http://localhost:3000`.
3. To view saved messages and orders, open `http://localhost:3000/admin.html`.

## Project Structure

- `server.js` - basic HTTP server that serves static files and handles order and contact submissions.
- `data/orders.json` - stores order data including customer name and email.
- `data/messages.json` - stores contact form messages.
- `public/` - static assets
  - `index.html` - main page
  - `style.css` - page styling
  - `script.js` - client side logic
  - `admin.html` & `admin.js` - simple dashboard to read saved data
  - `img/` - product images. The folder contains a `.gitkeep` file so it
    exists in the repository, but actual image files are ignored via
    `.gitignore`. Add your own images locally with the names referenced in
    `script.js` (e.g. `product1.png`). The site loads them by filename only.

## Product Images

Place your own image files in the `public/img/` directory. The JavaScript
product list refers to them only by file name. The `public/img/` folder is
listed in `.gitignore`, so these files stay on your machine and are not
committed. As long as the names match those in `script.js`, they will display on
the site without being uploaded or hosted anywhere else.

## Limitations

This project is meant as a demonstration. Payment processing and email delivery are not implemented. Contact messages are simply written to `data/messages.json`. Integrate your preferred payment gateway and email service for production use.
