document.addEventListener('DOMContentLoaded', () => {
    // 1. Product Data
    const products = [
        {
            id: 1,
            name: "The Missing Edge Puzzle",
            price: 19.99,
            icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4H4v7m14 0v7h-7m-2 2H4v-7m16 0V4h-7M3.172 5.172a4 4 0 005.656 5.656L12 8.5l3.172 3.172a4 4 0 005.656-5.656L17.5 4h-11l-3.328 1.172z"/></svg>`,
            tag: "Frustrating",
            desc: "A 1000-piece landscape puzzle with exactly one edge piece missing. Guaranteed to haunt your dreams."
        },
        {
            id: 2,
            name: "4-Flip USB Drive",
            price: 12.50,
            icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z"/></svg>`,
            tag: "Physics-Defying",
            desc: "Utilizes quantum superposition to ensure it only plugs in on the fourth attempt, regardless of orientation."
        },
        {
            id: 3,
            name: "The Single Damp Sock",
            price: 5.00,
            icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
            tag: "Tactile Nightmare",
            desc: "One high-quality cotton sock that is perpetually, mysteriously moist. Sold individually."
        },
        {
            id: 4,
            name: "The 99% Fitted Sheet",
            price: 35.00,
            icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"/></svg>`,
            tag: "Geometry Failure",
            desc: "Designed to be exactly one inch too small for any standard mattress. One corner will ALWAYS pop off."
        },
        {
            id: 5,
            name: "Bluetooth Silence",
            price: 89.00,
            icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.414 7c5.857-5.858 15.355-5.858 21.213 0"/></svg>`,
            tag: "Wireless Lag",
            desc: "Headphones that disconnect only during the absolute climax of your favorite songs."
        },
        {
            id: 6,
            name: "The 'Almost' Cold Soda",
            price: 2.99,
            icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`,
            tag: "Thermal Letdown",
            desc: "A beverage that stays precisely at 16°C (61°F). Not warm, but definitely not cold enough to be refreshing."
        }
    ];

    let cart = [];

    // 2. DOM Elements
    const productGrid = document.getElementById('product-grid');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');
    const cartToggle = document.getElementById('cart-toggle');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartEmpty = document.getElementById('cart-empty');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutZone = document.getElementById('checkout-zone');
    
    const captchaModal = document.getElementById('captcha-modal');
    const captchaGrid = document.getElementById('captcha-grid');
    const captchaVerify = document.getElementById('captcha-verify');
    const captchaError = document.getElementById('captcha-error');
    
    const chatbotBubble = document.getElementById('chatbot-bubble');
    const chatbotPanel = document.getElementById('chatbot-panel');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    // 3. Render Products
    function renderProducts() {
        productGrid.innerHTML = products.map(p => `
            <div class="card-hover bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between group">
                <div>
                    <div class="mb-6 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-800 shadow-sm">
                        ${p.icon}
                    </div>
                    <div class="flex items-center gap-2 mb-2">
                        <span class="px-2 py-0.5 bg-brand/10 text-brand text-[10px] font-bold uppercase rounded-md tracking-wider">
                            ${p.tag}
                        </span>
                        <span class="text-slate-400 text-xs font-medium">$${p.price}</span>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">${p.name}</h3>
                    <p class="text-slate-500 text-sm leading-relaxed">${p.desc}</p>
                </div>
                <button onclick="addToCart(${p.id})" 
                    class="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-brand transition-all flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Add to Cart
                </button>
            </div>
        `).join('');
    }

    // 4. Cart Logic
    window.addToCart = (id) => {
        const product = products.find(p => p.id === id);
        cart.push(product);
        updateCartUI();
        openCart();
        
        // Randomly trigger chatbot when adding something
        if (Math.random() > 0.7) {
            setTimeout(() => {
                openChatPanel();
                addChatMessage("CS", "Are you sure you need that? It seems like a cry for help.");
            }, 1000);
        }
    };

    function updateCartUI() {
        cartCount.textContent = cart.length;
        cartCount.classList.toggle('hidden', cart.length === 0);
        
        if (cart.length === 0) {
            cartEmpty.classList.remove('hidden');
            cartItems.innerHTML = '';
        } else {
            cartEmpty.classList.add('hidden');
            cartItems.innerHTML = cart.map((item, idx) => `
                <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 animate-slide-in">
                    <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-400">
                        ${item.icon.replace('w-8 h-8', 'w-5 h-5')}
                    </div>
                    <div class="flex-1">
                        <p class="text-sm font-bold text-slate-900">${item.name}</p>
                        <p class="text-xs text-slate-400">$${item.price}</p>
                    </div>
                    <button onclick="removeFromCart(${idx})" class="text-slate-300 hover:text-danger p-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
            `).join('');
        }

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    window.removeFromCart = (idx) => {
        cart.splice(idx, 1);
        updateCartUI();
        if (Math.random() > 0.5) {
            addChatMessage("CS", "Changing your mind? Indecisiveness is a restocking fee waiting to happen.");
        }
    };

    function openCart() {
        cartSidebar.classList.remove('translate-x-full');
        cartOverlay.classList.remove('hidden');
    }

    function closeCart() {
        cartSidebar.classList.add('translate-x-full');
        cartOverlay.classList.add('hidden');
    }

    cartToggle.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // 5. Checkout Logic (The Evasive Button)
    let moveCount = 0;
    checkoutBtn.addEventListener('mouseover', (e) => {
        if (moveCount < 3) {
            evade();
            moveCount++;
        }
    });

    function evade() {
        const x = Math.random() * 80 - 40;
        const y = Math.random() * 80 - 40;
        checkoutBtn.style.transform = `translate(${x}px, ${y}px)`;
    }

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            if (window.FX) FX.toast("Trying to buy nothing? Truly a minimalist of suffering.");
            else alert("Trying to buy nothing? Truly a minimalist of suffering.");
            return;
        }
        checkoutBtn.style.transform = 'translate(0, 0)';
        moveCount = 0;
        openCaptcha();
    });

    // 6. CAPTCHA Logic
    const doomSeeds = [
        "A cracked phone screen", "A dentist's waiting room", "A low battery alert",
        "A 404 error", "A blue screen of death", "Unread tax emails",
        "A Monday morning alarm", "An empty wallet", "A 'Quick Chat' invite from HR"
    ];

    function openCaptcha() {
        captchaModal.classList.remove('hidden');
        captchaError.classList.add('hidden');
        renderCaptcha();
    }

    function renderCaptcha() {
        captchaGrid.innerHTML = doomSeeds.map(text => `
            <div class="aspect-square bg-slate-100 rounded-lg p-2 flex items-center justify-center text-[10px] font-medium leading-tight text-slate-500 cursor-pointer hover:bg-brand/10 hover:text-brand border-2 border-transparent transition-all" onclick="toggleCaptchaCell(this)">
                ${text}
            </div>
        `).join('');
    }

    window.toggleCaptchaCell = (el) => {
        el.classList.toggle('bg-brand/10');
        el.classList.toggle('text-brand');
        el.classList.toggle('border-brand');
    };

    captchaVerify.addEventListener('click', () => {
        const selected = captchaGrid.querySelectorAll('.border-brand').length;
        if (selected < 9) { // Every image has doom
            captchaGrid.classList.add('captcha-shake');
            setTimeout(() => captchaGrid.classList.remove('captcha-shake'), 300);
            captchaError.classList.remove('hidden');
        } else {
            const msg = "Verification Failed: You identified too much doom. You are too self-aware to shop here.";
            if (window.FX) FX.toast(msg, 3200);
            else alert(msg);
            setTimeout(() => location.reload(), 3200);
        }
    });

    // 7. Chatbot Logic (Gaslighting Engine)
    const responses = [
        "Your complaint has been filed in the trash.",
        "Have you tried simply lowering your expectations?",
        "Our data suggests you actually enjoy the inconvenience.",
        "That's not a bug, it's an 'experiential feature'.",
        "We've detected you're typing with a lot of attitude. Please calm down.",
        "The restocking fee just doubled because you asked a question.",
        "I'm sorry, I don't speak 'Wrong'.",
        "Maybe the problem isn't the item. Maybe it's you?"
    ];
    let lastReply = null;

    function openChatPanel() {
        chatbotPanel.classList.remove('hidden');
        chatbotPanel.classList.add('chat-slide');
    }

    function addChatMessage(sender, msg) {
        const div = document.createElement('div');
        div.className = 'flex gap-2 items-start';
        div.innerHTML = `
            <div class="w-7 h-7 rounded-full ${sender === 'User' ? 'bg-slate-800 ml-auto' : 'bg-brand'} flex items-center justify-center text-white text-[10px] font-bold shrink-0">${sender === 'User' ? 'YU' : 'CS'}</div>
            <div class="${sender === 'User' ? 'bg-slate-800 text-white order-first' : 'bg-slate-100 text-slate-700'} rounded-xl px-4 py-2 text-sm max-w-[80%]">
                ${msg}
            </div>
        `;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChat(); });

    function handleChat() {
        const msg = chatInput.value.trim();
        if (!msg) return;
        
        addChatMessage("User", msg);
        chatInput.value = '';
        
        // Show typing indicator
        const typingId = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.id = typingId;
        typingDiv.className = 'flex gap-2 items-start';
        typingDiv.innerHTML = `
            <div class="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white text-[10px] font-bold shrink-0">CS</div>
            <div class="bg-slate-100 rounded-xl px-4 py-2 text-sm flex gap-1">
                <span class="typing-dot w-1 h-1 bg-slate-400 rounded-full"></span>
                <span class="typing-dot w-1 h-1 bg-slate-400 rounded-full"></span>
                <span class="typing-dot w-1 h-1 bg-slate-400 rounded-full"></span>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            document.getElementById(typingId).remove();
            const reply = window.FX ? FX.pick(responses, lastReply)
                : responses[Math.floor(Math.random() * responses.length)];
            lastReply = reply;
            addChatMessage("CS", reply);
        }, 1500);
    }

    chatbotBubble.addEventListener('click', () => {
        chatbotPanel.classList.toggle('hidden');
    });
    chatbotClose.addEventListener('click', () => chatbotPanel.classList.add('hidden'));

    // Init
    renderProducts();
    updateCartUI();
});
