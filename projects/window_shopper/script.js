/* script.js - Window Shopper for Trillionaires */

// ===== 1. PRODUCT DATA =====
const products = [
    {
        id: 1,
        name: "The Concept of Tuesday",
        price: 44000000000,
        icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>',
        description: "Own the entire idea of the second day of the work week. Rename it. Delete it. It's yours.",
        reviews: [
            { author: "Cleopatra", stars: 5, text: "Finally, I can skip to Wednesday. Revolutionary." },
            { author: "Bigfoot", stars: 3, text: "I don't really track days, but sure, it's nice." },
        ]
    },
    {
        id: 2,
        name: "The Moon, Slightly Used",
        price: 12000000000000,
        icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>',
        description: "Pre-owned. One careful owner (gravity). Minor crater damage. No returns.",
        reviews: [
            { author: "Neil Armstrong", stars: 4, text: "Been there. It's alright. Could use a coffee shop." },
            { author: "A Wolf", stars: 5, text: "AWOOOOOOO. 10/10 would howl again." },
        ]
    },
    {
        id: 3,
        name: "3-Inch Tall Abraham Lincoln Clone",
        price: 850000000,
        icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>',
        description: "Fully sentient. Gives tiny motivational speeches. Fits in your pocket. Emancipates your snacks.",
        reviews: [
            { author: "The Clone Himself", stars: 1, text: "I did not consent to this listing." },
            { author: "Napoleon", stars: 5, text: "Finally, someone shorter than me. I'm thrilled." },
        ]
    },
    {
        id: 4,
        name: "Wi-Fi That Works in the Wilderness",
        price: 7800000000,
        icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"/></svg>',
        description: "Full 5G coverage on every mountain, cave, and ocean floor. No dead zones. Ever.",
        reviews: [
            { author: "Bear Grylls", stars: 5, text: "Now I can stream while surviving. Game changer." },
            { author: "The Loch Ness Monster", stars: 4, text: "Finally got Netflix down here. About time." },
        ]
    },
    {
        id: 5,
        name: "A Jar of Silence",
        price: 2300000000,
        icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"/></svg>',
        description: "Open the jar to create a 50-meter radius of absolute silence. Close it to stop. Side effects: existential dread.",
        reviews: [
            { author: "A Librarian", stars: 5, text: "I've been waiting my ENTIRE career for this product." },
            { author: "A Toddler", stars: 1, text: "AAAAAAAAAAAA— [review cut short]" },
        ]
    },
    {
        id: 6,
        name: "Yesterday's Winning Lottery Numbers",
        price: 500000000,
        icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/></svg>',
        description: "100% accurate. 100% useless. A collectors item for those who appreciate irony.",
        reviews: [
            { author: "A Time Traveler", stars: 2, text: "Almost useful. Almost." },
            { author: "Socrates", stars: 5, text: "The truest knowledge is knowing what you cannot use." },
        ]
    },
    {
        id: 7,
        name: "The Color That Doesn't Exist Yet",
        price: 19500000000,
        icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125V7.5M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"/></svg>',
        description: "A swatch of a color no human eye has ever perceived. Staring at it voids all warranties on your retinas.",
        reviews: [
            { author: "Picasso", stars: 5, text: "I thought I'd seen everything. I was wrong. I can't describe it." },
            { author: "A Mantis Shrimp", stars: 3, text: "Meh. I've seen better." },
        ]
    },
    {
        id: 8,
        name: "The Concept of Hide and Seek",
        price: 1200000000,
        icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
        description: "Own the intellectual property of the world's oldest game. Charge royalties to every playground.",
        reviews: [
            { author: "Bigfoot", stars: 2, text: "Too easy. I've been winning for centuries and nobody even knows." },
            { author: "Waldo", stars: 1, text: "This ruined my career." },
        ]
    },
    {
        id: 9,
        name: "Gravity (Just Yours)",
        price: 88000000000000,
        icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"/></svg>',
        description: "Personal gravity settings. Walk on walls, float to meetings, or just vibe upside down.",
        reviews: [
            { author: "Isaac Newton", stars: 4, text: "I spent my whole life studying this and now you can just BUY it?!" },
            { author: "A Cat", stars: 5, text: "I already defy gravity. But sure, formalize it." },
        ]
    },
];

// ===== 2. STATE =====
let cart = [];

// ===== 3. RENDER PRODUCTS =====
function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => `
        <div class="card-hover bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm group">
            <div>
        <div class="text-slate-500 mb-6">${p.icon}</div>
                <h2 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand transition-colors">${p.name}</h2>
                <p class="text-slate-500 text-sm leading-relaxed mb-4">${p.description}</p>
                <p class="text-2xl font-extrabold price-tag mb-6">${formatPrice(p.price)}</p>
                
                <!-- Reviews -->
                <div class="space-y-3 mb-6">
                    ${p.reviews.map(r => `
                        <div class="bg-slate-50 rounded-xl p-4 text-left">
                            <div class="flex items-center justify-between mb-1">
                                <span class="text-xs font-bold text-slate-700">${r.author}</span>
                                <span class="stars text-xs">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
                            </div>
                            <p class="text-xs text-slate-500 italic">"${r.text}"</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            <button onclick="addToCart(${p.id})" class="w-full bg-obsidian text-white font-semibold py-3 rounded-xl hover:bg-brand transition-all text-sm">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// ===== 4. CART LOGIC =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCartUI();

    // Brief flash on the cart button
    const btn = document.getElementById('cart-toggle');
    btn.classList.add('!bg-brand');
    setTimeout(() => btn.classList.remove('!bg-brand'), 300);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const countEl = document.getElementById('cart-count');
    const itemsEl = document.getElementById('cart-items');
    const emptyEl = document.getElementById('cart-empty');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    countEl.textContent = totalItems;
    totalEl.textContent = formatPrice(totalPrice);
    checkoutBtn.disabled = cart.length === 0;

    if (cart.length === 0) {
        emptyEl.classList.remove('hidden');
        itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());
        return;
    }

    emptyEl.classList.add('hidden');

    // Re-render cart items
    const existingItems = itemsEl.querySelectorAll('.cart-item');
    existingItems.forEach(el => el.remove());

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item flex items-start gap-4 bg-slate-50 rounded-xl p-4';
        div.innerHTML = `
            <span class="text-slate-500">${item.icon}</span>
            <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-sm text-slate-900 truncate">${item.name}</h4>
                <p class="text-xs text-slate-400">Qty: ${item.qty}</p>
                <p class="text-sm font-bold price-tag">${formatPrice(item.price * item.qty)}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-slate-300 hover:text-red-500 transition-colors text-lg mt-1">&times;</button>
        `;
        itemsEl.appendChild(div);
    });
}

function toggleCart() {
    const panel = document.getElementById('cart-panel');
    const overlay = document.getElementById('cart-overlay');
    panel.classList.toggle('open');
    overlay.classList.toggle('hidden');
}

// ===== 5. CHECKOUT =====
function checkout() {
    if (cart.length === 0) return;

    toggleCart(); // Close the cart sidebar

    const receiptItems = document.getElementById('receipt-items');
    const receiptTotal = document.getElementById('receipt-total');
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Populate receipt
    receiptItems.innerHTML = cart.map(item => `
        <div class="flex justify-between text-sm">
            <span class="text-slate-600">${item.name} <span class="text-slate-400">×${item.qty}</span></span>
            <span class="font-semibold">${formatPrice(item.price * item.qty)}</span>
        </div>
    `).join('');

    receiptTotal.textContent = formatPrice(totalPrice);

    // Accumulate (and persist) lifetime spend across checkouts
    let lifetime = 0;
    try { lifetime = parseFloat(localStorage.getItem('ws-lifetime')) || 0; } catch (e) {}
    lifetime += totalPrice;
    try { localStorage.setItem('ws-lifetime', String(lifetime)); } catch (e) {}
    const lifeEl = document.getElementById('lifetime-spend');
    if (lifeEl) lifeEl.textContent = formatPrice(lifetime);

    // Generate shipping tracker
    generateShippingTracker();

    // Show modal
    const modal = document.getElementById('receipt-modal');
    modal.classList.add('active');

    // Clear cart
    cart = [];
    updateCartUI();
}

function generateShippingTracker() {
    const container = document.getElementById('shipping-steps');
    const steps = [
        { status: 'complete', label: 'Order Confirmed', detail: 'Approved by The Multiverse Banking Authority', time: 'Just now' },
        { status: 'complete', label: 'Payment Processed', detail: 'Unlimited Black Card™ charged successfully', time: '0.003 seconds ago' },
        { status: 'complete', label: 'Item Manifested', detail: 'Plucked from the fabric of reality by certified metaphysical engineers', time: '2 planck times ago' },
        { status: 'active', label: 'Stuck in Interdimensional Customs', detail: 'Your package is being inspected by Dimension 7-B border patrol. Estimated wait: ∞', time: 'Currently' },
        { status: 'pending', label: 'Out for Delivery', detail: 'A sentient drone will deliver your item while humming jazz', time: 'TBD' },
        { status: 'pending', label: 'Delivered', detail: 'Item will materialize on your doorstep (or in a parallel version of your doorstep)', time: 'Someday, maybe' },
    ];

    container.innerHTML = steps.map((step, i) => {
        const dotColor = step.status === 'complete' ? 'bg-brand' : step.status === 'active' ? 'bg-amber-400 pulse-dot' : 'bg-slate-200';
        const lineColor = step.status === 'complete' ? 'bg-brand' : 'bg-slate-200';
        const textColor = step.status === 'pending' ? 'text-slate-300' : 'text-slate-900';
        const detailColor = step.status === 'pending' ? 'text-slate-300' : 'text-slate-500';

        return `
            <div class="flex gap-4">
                <div class="flex flex-col items-center">
                    <div class="w-3.5 h-3.5 rounded-full ${dotColor} flex-shrink-0 mt-1.5"></div>
                    ${i < steps.length - 1 ? `<div class="w-0.5 flex-1 ${lineColor} mt-1"></div>` : ''}
                </div>
                <div class="pb-6">
                    <p class="text-sm font-semibold ${textColor}">${step.label}</p>
                    <p class="text-xs ${detailColor}">${step.detail}</p>
                    <p class="text-xs text-slate-400 mt-1">${step.time}</p>
                </div>
            </div>
        `;
    }).join('');
}

function closeReceipt() {
    const modal = document.getElementById('receipt-modal');
    modal.classList.remove('active');
}

// ===== 6. HELPERS =====
function formatPrice(num) {
    if (num >= 1e12) return '$' + (num / 1e12).toFixed(1) + ' Trillion';
    if (num >= 1e9) return '$' + (num / 1e9).toFixed(1) + ' Billion';
    if (num >= 1e6) return '$' + (num / 1e6).toFixed(0) + ' Million';
    return '$' + num.toLocaleString();
}

// ===== 7. INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    document.getElementById('cart-toggle').addEventListener('click', toggleCart);

    // ESC closes the receipt, then the cart
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const modal = document.getElementById('receipt-modal');
        if (modal.classList.contains('active')) { closeReceipt(); return; }
        if (document.getElementById('cart-panel').classList.contains('open')) toggleCart();
    });
});
