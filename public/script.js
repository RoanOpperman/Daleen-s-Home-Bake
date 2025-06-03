const products = [
    { id: 1, name: 'Chocolate Cake', price: 15 },
    { id: 2, name: 'Lemon Tart', price: 12 },
    { id: 3, name: 'Banana Bread', price: 8 }
];

const cart = [];

function renderProducts() {
    const list = document.getElementById('product-list');
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
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
    fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart })
    })
    .then(res => res.json())
    .then(() => {
        alert('Order placed!');
        cart.length = 0;
        renderCart();
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
    alert('Thank you for reaching out, ' + name + '!');
    contactForm.reset();
});
