# Deleen's Home Bake

A simple online bakery store built with Node.js and vanilla JavaScript. It lists products in a three-column grid, loops customer testimonials across the top, and allows visitors to place orders and send messages through a contact form. Orders and messages are stored in JSON files.

## Getting Started

1. Start the server:
   ```bash
   node server.js
   ```
2. Open your browser at `http://localhost:3000`.

## Project Structure

- `server.js` - basic HTTP server that serves static files and handles order and contact submissions.
- `orders.json` - stores order data.
- `messages.json` - stores contact form messages.
- `public/` - static assets
  - `index.html` - main page
  - `style.css` - page styling
  - `script.js` - client side logic

## Limitations

This project is meant as a demonstration. Payment processing and email delivery are not implemented. Contact messages are simply written to `messages.json`. Integrate your preferred payment gateway and email service for production use.
