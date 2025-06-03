# Deleen's Home Bake

A simple online bakery store built with Node.js and vanilla JavaScript. It lists products, allows visitors to place orders and submit a contact form. Orders are stored in a JSON file.

## Getting Started

1. Start the server:
   ```bash
   node server.js
   ```
2. Open your browser at `http://localhost:3000`.

## Project Structure

- `server.js` - basic HTTP server that serves static files and handles order submissions.
- `orders.json` - stores order data.
- `public/` - static assets
  - `index.html` - main page
  - `style.css` - page styling
  - `script.js` - client side logic

## Limitations

This project is meant as a demonstration. Payment processing and email functionality are not implemented. Integrate your preferred payment gateway and email service for production use.
