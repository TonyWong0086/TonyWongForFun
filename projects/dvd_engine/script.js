/**
 * The DVD Logo Corner Anticipation Engine - Logic
 * A masterclass in patience and probability.
 */

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('dvd-logo');
    const bounceDisplay = document.getElementById('bounce-count');
    const cornerDisplay = document.getElementById('corner-count');
    const timerDisplay = document.getElementById('timer');
    const bestDisplay = document.getElementById('best-time');
    const nearDisplay = document.getElementById('near-count');
    const celebration = document.getElementById('celebration');

    // State
    const rect = logo.getBoundingClientRect();
    let x = Math.random() * (window.innerWidth - rect.width);
    let y = Math.random() * (window.innerHeight - rect.height);
    let dx = 2.5;
    let dy = 2.5;
    let bounces = 0;
    let cornerHits = 0;
    let nearMisses = 0;
    let runStart = Date.now();      // time since the last corner hit
    let bestTime = loadBest();

    const colors = [
        '#ff0000', '#00ff00', '#0000ff', '#ffff00',
        '#ff00ff', '#00ffff', '#ffffff', '#ff8800',
        '#88ff00', '#0088ff', '#cc00ff'
    ];

    function loadBest() {
        try {
            const v = localStorage.getItem('dvd-best-time');
            return v ? parseInt(v, 10) : null;
        } catch (e) { return null; }
    }
    function saveBest(ms) {
        try { localStorage.setItem('dvd-best-time', String(ms)); } catch (e) {}
    }
    function fmt(ms) {
        const total = Math.floor(ms / 1000);
        const m = Math.floor(total / 60);
        const s = total % 60;
        return `${m}:${String(s).padStart(2, '0')}`;
    }

    function changeColor() {
        logo.style.color = colors[Math.floor(Math.random() * colors.length)];
    }

    function triggerCelebration() {
        cornerHits++;
        cornerDisplay.textContent = cornerHits;

        // Record how long this corner took, and beat-the-best
        const elapsed = Date.now() - runStart;
        if (bestTime === null || elapsed < bestTime) {
            bestTime = elapsed;
            saveBest(bestTime);
        }
        bestDisplay.textContent = fmt(bestTime);
        runStart = Date.now();

        // 1. Confetti
        const duration = 3 * 1000;
        const end = Date.now() + duration;
        (function frame() {
            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());

        // 2. Message
        celebration.classList.add('show');
        setTimeout(() => celebration.classList.remove('show'), 2500);

        // 3. Pop the logo
        logo.style.transform = "scale(1.5)";
        setTimeout(() => logo.style.transform = "scale(1)", 500);
    }

    function flashNearMiss() {
        nearMisses++;
        nearDisplay.textContent = nearMisses;
        celebration.textContent = 'SO CLOSE';
        celebration.classList.add('show');
        setTimeout(() => {
            celebration.classList.remove('show');
            celebration.textContent = 'CORNER HIT!';
        }, 900);
    }

    function update() {
        const logoWidth = logo.offsetWidth;
        const logoHeight = logo.offsetHeight;

        x += dx;
        y += dy;

        let hitX = false;
        let hitY = false;

        // Wall collisions
        if (x + logoWidth >= window.innerWidth || x <= 0) {
            dx *= -1;
            x = Math.max(0, Math.min(x, window.innerWidth - logoWidth));
            hitX = true;
            bounces++;
            changeColor();
        }
        if (y + logoHeight >= window.innerHeight || y <= 0) {
            dy *= -1;
            y = Math.max(0, Math.min(y, window.innerHeight - logoHeight));
            hitY = true;
            bounces++;
            changeColor();
        }

        // Corner check — a true simultaneous hit is the jackpot; a single-axis
        // hit very close to a corner is a heartbreaking "near miss".
        if (hitX && hitY) {
            triggerCelebration();
        } else if (hitX || hitY) {
            const nearLeft = x <= 60, nearRight = x + logoWidth >= window.innerWidth - 60;
            const nearTop = y <= 60, nearBottom = y + logoHeight >= window.innerHeight - 60;
            if ((hitX && (nearTop || nearBottom)) || (hitY && (nearLeft || nearRight))) {
                flashNearMiss();
            }
        }

        bounceDisplay.textContent = bounces;
        logo.style.left = x + 'px';
        logo.style.top = y + 'px';

        requestAnimationFrame(update);
    }

    // Elapsed-time ticker (since last corner)
    if (bestTime !== null) bestDisplay.textContent = fmt(bestTime);
    setInterval(() => { timerDisplay.textContent = fmt(Date.now() - runStart); }, 1000);

    // Handle Window Resize
    window.addEventListener('resize', () => {
        x = Math.min(x, window.innerWidth - logo.offsetWidth);
        y = Math.min(y, window.innerHeight - logo.offsetHeight);
    });

    // Hidden Cheat: Press 'C' to force a corner hit
    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'c') triggerCelebration();
    });

    // Start
    update();
});
