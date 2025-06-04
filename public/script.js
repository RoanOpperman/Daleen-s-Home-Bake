const products = [
    { id: 1, name: 'Chocolate Cake', price: 15, image: 'img/product1.png' },
    { id: 2, name: 'Lemon Tart', price: 12, image: 'img/product2.png' },
    { id: 3, name: 'Banana Bread', price: 8, image: 'img/product3.png' },
    { id: 4, name: 'Blueberry Muffin', price: 5, image: 'img/product4.png' },
    { id: 5, name: 'Croissant', price: 4, image: 'img/product5.png' },
    { id: 6, name: 'Apple Pie', price: 10, image: 'img/product6.png' },
    { id: 7, name: 'Carrot Cake', price: 14, image: 'img/product7.png' },
    { id: 8, name: 'Cheesecake', price: 16, image: 'img/product8.png' },
    { id: 9, name: 'Brownie', price: 3, image: 'img/product9.png' }
];

const cart = [];

function renderProducts() {
    const list = document.getElementById('product-list');
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>$${p.price.toFixed(2)}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>`;
        list.appendChild(div);
    });
}

function renderCart() {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        list.appendChild(div);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        renderCart();
    }
}

document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Cart is empty');
        return;
    }

    const name = document.getElementById('order-name').value;
    const email = document.getElementById('order-email').value;
    if (!name || !email) {
        alert('Please enter your name and email');
        return;
    }

    fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, items: cart })
    })
    .then(res => res.json())
    .then(() => {
        alert('Order placed!');
        cart.length = 0;
        renderCart();
        document.getElementById('order-name').value = '';
        document.getElementById('order-email').value = '';
    })
    .catch(err => alert('Error: ' + err));
});

renderProducts();

// Contact form
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    })
    .then(res => res.json())
    .then(() => {
        alert('Thank you for reaching out, ' + name + '!');
        contactForm.reset();
    })
    .catch(err => alert('Error: ' + err));
});
