/* script.js - Reply-All Panic Simulator */

document.addEventListener('DOMContentLoaded', () => {
    const startModal = document.getElementById('start-modal');
    const gameOverModal = document.getElementById('game-over-modal');
    const startBtn = document.getElementById('start-game-btn');
    const unsendBtn = document.getElementById('unsend-btn');
    const timerEl = document.getElementById('game-timer');
    const falloutArea = document.getElementById('fallout-notifications');
    const canvas = document.getElementById('simulator-canvas');
    const outcomeTitle = document.getElementById('outcome-title');
    const outcomeDesc = document.getElementById('outcome-desc');

    let timeLeft = 30;
    let gameActive = false;
    let timerId = null;
    let notificationInterval = null;

    const notifications = [
        { from: "Karen from Finance", msg: "Wow... bold strategy. <svg class='w-4 h-4 inline' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>", type: "slack" },
        { from: "Dave (Engineering)", msg: "Oof. I think I know why you weren't at lunch today.", type: "slack" },
        { from: "Boss's EA", msg: "The CEO just walked into Steve's office. He looks... red.", type: "slack" },
        { from: "The Group Chat", msg: "BRO NOOOOOOOOOOO", type: "slack" },
        { from: "IT Department", msg: "Remote data wipe request received for your laptop.", type: "system" },
        { from: "Slack Bot", msg: "1,429 people are typing in #General...", type: "system" },
        { from: "Linda", msg: "Did you actually mean to send this to Everyone??", type: "slack" },
        { from: "Marketing Team", msg: "Can we use this for our 'Authentic Workplace' campaign?", type: "slack" },
        { from: "HR Bot", msg: "A meeting has been scheduled: 'Immediate Conduct Review'", type: "system" },
        { from: "Corporate Security", msg: "Your badge access to the building has been suspended.", type: "system" },
        { from: "Legal Team", msg: "Please refrain from deleting any local files. Litigation hold active.", type: "slack" },
        { from: "Gary (Sales)", msg: "LMAO STEVE JUST THREW HIS MUG", type: "slack" },
        { from: "Automatic Reply", msg: "I am currently out of office and will... wait, is this real?", type: "slack" },
        { from: "Intern #4", msg: "Is it okay if I post this on TikTok? (Just kidding, unless...)", type: "slack" },
    ];

    const popups = [
        "Update to Windows 12? (Immediate Restart Required)",
        "Your license for 'Existing' is about to expire.",
        "Low Battery: Laptop will shut down in 1s (Just kidding, but maybe?)",
        "Coffee break? No? Okay.",
        "Wanna break from the ads? Click here!",
        "Your computer has been infected with a virus! Click here to remove it!",
        "You have won a free iPhone! Click here to claim your prize!",
        "Your computer is running slow. Click here to speed it up!",
        "New Friend Request: Your Boss's Boss",
        "System Error: Dignity.dll not found.",
        "Are you sure you want to quit life? [Y/N]",
        "Warning: High stress detected in pre-frontal cortex.",
        "Incoming Call: MOM (She saw the email too somehow)",
        "Flash Sale: 50% off professional resume writing services!",
    ];

    startBtn.addEventListener('click', startGame);

    function startGame() {
        startModal.classList.add('hidden');
        unsendBtn.classList.remove('hidden');
        gameActive = true;

        notificationInterval = setInterval(spawnNotification, 2500);

        timerId = setInterval(() => {
            timeLeft -= 0.01;
            if (timeLeft <= 0) {
                timeLeft = 0;
                endGame(false);
            }
            timerEl.textContent = timeLeft.toFixed(2) + 's';
            if (timeLeft < 10) timerEl.classList.add('timer-flash');
        }, 10);

        // Make the button move frantically
        canvas.addEventListener('mousemove', handleAvoidance);
    }

    function handleAvoidance(e) {
        if (!gameActive) return;

        const btnRect = unsendBtn.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Detection radius
        const threshold = 120;
        const dist = Math.sqrt(
            Math.pow(mouseX - (btnRect.left + btnRect.width / 2), 2) +
            Math.pow(mouseY - (btnRect.top + btnRect.height / 2), 2)
        );

        if (dist < threshold) {
            moveButton();
        }
    }

    function moveButton() {
        const maxX = canvas.clientWidth - unsendBtn.clientWidth - 40;
        const maxY = canvas.clientHeight - unsendBtn.clientHeight - 40;

        const nextX = Math.random() * maxX + 20;
        const nextY = Math.random() * maxY + 20;

        unsendBtn.style.position = 'absolute';
        unsendBtn.style.left = nextX + 'px';
        unsendBtn.style.top = nextY + 'px';

        // Occasionally spawn a fake popup too
        if (Math.random() > 0.8) spawnFakePopup();
    }

    let lastNotif = null;
    function spawnNotification() {
        if (!gameActive) return;
        const data = window.FX ? FX.pick(notifications, lastNotif)
            : notifications[Math.floor(Math.random() * notifications.length)];
        lastNotif = data;

        const notif = document.createElement('div');
        notif.className = 'slack-notif bg-slate-900/90 text-white rounded-xl p-4 shadow-xl border border-slate-700 flex flex-col gap-1';
        notif.innerHTML = `
            <div class="flex justify-between items-center">
                <span class="text-[10px] font-bold text-brand uppercase tracking-widest">${data.from}</span>
                <span class="text-[8px] text-slate-500">Just now</span>
            </div>
            <p class="text-sm">${data.msg}</p>
        `;

        falloutArea.appendChild(notif);
        if (falloutArea.children.length > 5) falloutArea.removeChild(falloutArea.firstChild);
    }

    function spawnFakePopup() {
        const p = document.createElement('div');
        p.className = 'absolute bg-white border-2 border-slate-900 rounded-lg shadow-2xl p-4 z-50 pointer-events-auto';
        p.style.left = Math.random() * 50 + 20 + '%';
        p.style.top = Math.random() * 50 + 20 + '%';
        p.innerHTML = `
            <div class="flex justify-between mb-3 border-b pb-2 select-none">
                <span class="text-xs font-bold font-mono">SYSTEM_ALERT</span>
                <button class="text-xs hover:text-panic">&times;</button>
            </div>
            <p class="text-xs font-medium mb-4">${window.FX ? FX.pick(popups) : popups[Math.floor(Math.random() * popups.length)]}</p>
            <button class="w-full bg-slate-100 py-1 text-[10px] font-bold rounded border hover:bg-slate-200" onclick="this.parentElement.remove()">CLOSE</button>
        `;
        canvas.appendChild(p);
        setTimeout(() => { if (gameActive && p.parentElement) p.remove() }, 3000);
    }

    unsendBtn.addEventListener('click', () => {
        if (!gameActive) return;
        endGame(true);
    });

    function endGame(success) {
        gameActive = false;
        clearInterval(timerId);
        clearInterval(notificationInterval);
        unsendBtn.classList.add('hidden');

        gameOverModal.classList.remove('hidden');

        if (success) {
            outcomeTitle.innerHTML = "MIRACLE ACHIEVED";
            outcomeTitle.classList.remove('text-panic');
            outcomeTitle.classList.add('text-emerald-500');
            outcomeDesc.innerHTML = "You clicked UNSEND just in time! The email vanished. You survived... but Corporate IT noticed you were doing 400 clicking-actions per minute. They're still curious.";
        } else {
            outcomeTitle.innerHTML = "TOTAL CAREER COLLAPSE";
            outcomeTitle.classList.add('text-panic');
            outcomeDesc.innerHTML = "The timer hit zero. Your email is now in every inbox in the organization. The CEO is reading it. Steve from Finance is crying. IT has locked your Slack account.";
        }
    }
});
