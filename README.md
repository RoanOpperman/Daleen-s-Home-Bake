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
  - `img/` - product images. The directory is ignored by Git so you can add
    your own files locally. The site loads images by filename only and no image
    files are committed to the repository.

## Product Images

Place your own image files in the `public/img/` directory. A `.gitkeep` file
is tracked so the folder exists in the repository, but the images themselves
are ignored via `.gitignore`. The product list in `script.js` references files
by name. Add images with the following filenames so that each product shows the
correct picture:

```
chocolate-cake.png
lemon-tart.png
banana-bread.png
blueberry-muffin.png
croissant.png
apple-pie.png
carrot-cake.png
cheesecake.png
brownie.png
```

As long as these names match, the site will load the images from your local
machine without uploading them anywhere. If an image is missing, a gray
placeholder is shown automatically so the page layout remains intact.

## Limitations

This project is meant as a demonstration. Payment processing and email delivery are not implemented. Contact messages are simply written to `data/messages.json`. Integrate your preferred payment gateway and email service for production use.
