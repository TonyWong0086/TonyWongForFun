/**
 * The Useless Talent Agency - Logic
 * Mimicking professional networking absurdity.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Structures
    const recruiters = [
        { name: "Chad B. (Hyper-Growth Startup)", msg: "Hey! Saw your skill in 'Microwave Timing'. We're looking for a disruptive Heat-Transfer Evangelist. Equity only, no salary. Interested?" },
        { name: "Tiffany (Corporate Synergy)", msg: "Hi there, I'm recruiting for a Fortune 500. Can you confirm if your 'Grocery Bag Tetris' certification is current? We need someone to load the company fridge." },
        { name: "Algorithm #942", msg: "BEEP. YOUR SKILL: 'PROCRASTINATION' MATCHES OUR NEED: 'GOVERNMENT_CONSULTANT'. PLEASE CLICK TO ACCEPT $0.00 SALARY." },
        { name: "Steve from Finance", msg: "Stop endorsing me for 'Passive Aggressive Emailing'. Seriously. HR is watching." },
        { name: "Desperate Founder", msg: "I have an idea for Uber but for people who carry your groceries. Need a CTO (Chief Trash Officer)." }
    ];

    const endorsements = {
        microwave: 14,
        bags: 32,
        procrastinate: 999
    };

    // 2. DOM Elements
    const msgHeader = document.getElementById('msg-header');
    const msgPanel = document.getElementById('msg-panel');
    const msgList = document.getElementById('msg-list');
    const notifMsg = document.getElementById('notif-msg');
    const notifNetwork = document.getElementById('notif-network');
    const notifToast = document.getElementById('notif-toast');
    const notifTitle = document.getElementById('notif-title');
    const notifDesc = document.getElementById('notif-desc');

    let msgOpen = false;
    let msgCount = 0;
    let lastRecruiter = null;
    const endorsed = {}; // track which skills you've already self-endorsed

    // 3. Functions
    window.endorse = (skill) => {
        // Locate the skill's button by its inline handler (each is unique)
        const btn = document.querySelector(`button[onclick="endorse('${skill}')"]`);

        if (endorsed[skill]) {
            // Un-endorse — even your own support is fickle
            endorsements[skill]--;
            endorsed[skill] = false;
            if (btn) { btn.textContent = 'Endorse'; btn.classList.remove('bg-linkedin', 'text-white', 'border-linkedin'); }
            showToast("Endorsement Withdrawn", "You retracted your own endorsement. Bold.");
        } else {
            endorsements[skill]++;
            endorsed[skill] = true;
            if (btn) { btn.textContent = '✓ Endorsed'; btn.classList.add('bg-linkedin', 'text-white', 'border-linkedin'); }
            showToast("Skill Endorsed!", `You endorsed yourself for this useless skill. Total: ${endorsements[skill]}`);

            // Networking occasionally summons a recruiter
            if (Math.random() > 0.4) setTimeout(receiveMessage, 1500);
        }

        // Reflect the new count in the profile if a counter span exists
        const countEl = document.querySelector(`[data-count="${skill}"]`);
        if (countEl) countEl.textContent = endorsements[skill];
    };

    function receiveMessage() {
        const recruiter = window.FX ? FX.pick(recruiters, lastRecruiter)
            : recruiters[Math.floor(Math.random() * recruiters.length)];
        lastRecruiter = recruiter;
        msgCount++;
        
        const div = document.createElement('div');
        div.className = "bg-white p-3 rounded-lg border border-slate-200 shadow-sm animate-in slide-in-from-bottom duration-300";
        div.innerHTML = `
            <p class="text-[10px] font-bold text-linkedin mb-1">${recruiter.name}</p>
            <p class="text-[11px] text-slate-700 leading-tight">${recruiter.msg}</p>
            <div class="mt-2 flex gap-2">
                <button data-action="dismiss" class="text-[9px] font-bold text-slate-400 hover:text-slate-600">Dismiss</button>
                <button data-action="ignore" class="text-[9px] font-bold text-linkedin hover:underline">Ignore Professionally</button>
            </div>
        `;

        msgList.prepend(div);
        
        // UI Updates
        notifMsg.textContent = msgCount;
        notifMsg.classList.remove('hidden');
        
        showToast("New Message", `${recruiter.name} sent you a useless offer.`);
    }

    function showToast(title, desc) {
        notifTitle.textContent = title;
        notifDesc.textContent = desc;
        
        notifToast.classList.remove('translate-x-80', 'opacity-0');
        notifToast.classList.add('translate-x-0', 'opacity-100');
        
        setTimeout(() => {
            notifToast.classList.add('translate-x-80', 'opacity-0');
            notifToast.classList.remove('translate-x-0', 'opacity-100');
        }, 3000);
    }

    // Toggle Messaging Panel
    msgHeader.addEventListener('click', () => {
        msgOpen = !msgOpen;
        if (msgOpen) {
            msgPanel.style.transform = "translateY(0)";
            document.getElementById('msg-arrow').style.transform = "rotate(180deg)";
            // Clear notifications when opened
            msgCount = 0;
            notifMsg.classList.add('hidden');
        } else {
            msgPanel.style.transform = "translateY(calc(100% - 48px))";
            document.getElementById('msg-arrow').style.transform = "rotate(0deg)";
        }
    });

    // Message actions (Dismiss / Ignore Professionally) — both just make it vanish
    msgList.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;
        const card = btn.closest('div.bg-white');
        if (!card) return;
        if (btn.dataset.action === 'ignore') showToast("Ignored", "Handled with maximum professionalism.");
        card.style.transition = 'opacity .25s, transform .25s';
        card.style.opacity = '0';
        card.style.transform = 'translateX(20px)';
        setTimeout(() => card.remove(), 250);
    });

    // "Connect" buttons in the right column → "Pending"
    document.querySelectorAll('main button').forEach((b) => {
        if (b.textContent.trim() === 'Connect') {
            b.addEventListener('click', () => {
                b.textContent = 'Pending';
                b.classList.add('text-slate-400');
                showToast("Request Sent", "They will ignore this at their earliest convenience.");
            });
        }
    });

    // 4. Random Periodic Network Ping
    setInterval(() => {
        if (Math.random() > 0.8) {
            notifNetwork.classList.toggle('hidden', false);
            notifNetwork.textContent = Math.floor(Math.random() * 5) + 1;
        }
    }, 10000);

    // Initial Welcome
    setTimeout(() => {
        showToast("Network Connected", "You are now visible to 0 high-quality employers.");
    }, 1000);
});
