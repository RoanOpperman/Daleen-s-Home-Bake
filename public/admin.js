function renderMessages(list) {
    const container = document.getElementById('messages');
    container.innerHTML = '';
    list.forEach(m => {
        const div = document.createElement('div');
        div.className = 'message';
        div.textContent = `${m.name} (${m.email}): ${m.message}`;
        container.appendChild(div);
    });
}

function renderOrders(list) {
    const container = document.getElementById('orders');
    container.innerHTML = '';
    list.forEach(o => {
        const div = document.createElement('div');
        div.className = 'order';
        const items = o.items.map(i => `${i.name} ($${i.price.toFixed(2)})`).join(', ');
        div.textContent = items;
        container.appendChild(div);
    });
}

fetch('/api/messages')
    .then(res => res.json())
    .then(renderMessages)
    .catch(err => console.error(err));

fetch('/api/orders')
    .then(res => res.json())
    .then(renderOrders)
    .catch(err => console.error(err));
