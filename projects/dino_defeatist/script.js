/**
 * The Fake "Chrome Dinosaur" Defeatist - Logic
 * Because even prehistoric creatures get burnout.
 */

document.addEventListener('DOMContentLoaded', () => {
    const dino = document.getElementById('dino');
    const bubble = document.getElementById('speech-bubble');
    const instruction = document.getElementById('instruction');
    const napsDisplay = document.getElementById('naps');

    const defeatistQuotes = [
        "What's the point? The cacti always win.",
        "I'm taking a nap. Wake me up when 5G is back.",
        "Evolution was a mistake. I missed the asteroid.",
        "Jumping doesn't solve structural problems.",
        "Another cactus? I'm over it.",
        "The desert is infinite. Gravity is a lie.",
        "I'm literally made of 2D pixels. Why bother?",
        "Don't you have work to do?"
    ];

    // After enough pestering, the dino simply stops cooperating
    const burnoutQuotes = [
        "No. I've decided. We're done jumping.",
        "I've filed for early retirement. Effective immediately.",
        "Try the cactus. Maybe IT wants to jump.",
        "I am unionizing. There is one member. It's me.",
        "Pressing space again will not change my mind."
    ];

    let isDepressed = false;
    let naps = 0;

    const pick = (arr, avoid) => window.FX ? FX.pick(arr, avoid)
        : arr[Math.floor(Math.random() * arr.length)];
    let lastQuote = "";

    const triggerDepression = () => {
        if (isDepressed) return;
        isDepressed = true;

        naps++;
        napsDisplay.textContent = `NAPS TAKEN: ${naps}`;

        // 1. Visual Sabotage
        dino.classList.add('depressed');
        instruction.style.visibility = 'hidden';

        // 2. The Existential Speech — escalates to full burnout after 5 naps
        const pool = naps >= 5 ? burnoutQuotes : defeatistQuotes;
        lastQuote = pick(pool, lastQuote);
        bubble.textContent = lastQuote;
        bubble.style.display = 'block';

        // Burnout naps last longer — the dino is really committed now
        const restTime = naps >= 5 ? 6000 : 4000;

        // 3. Reset after a while
        setTimeout(() => {
            dino.classList.remove('depressed');
            bubble.style.display = 'none';
            instruction.style.visibility = 'visible';
            isDepressed = false;
        }, restTime);
    };

    // Listen for interactions
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.key === ' ') {
            e.preventDefault();
            triggerDepression();
        }
    });

    window.addEventListener('touchstart', (e) => {
        // Don't trigger when tapping the exit link or the shared hub pill
        if (e.target.closest('.exit-link') || e.target.closest('.fx-back')) return;
        triggerDepression();
    });

    // Random blinking eye for the dino
    const eye = document.getElementById('dino-eye');
    setInterval(() => {
        if (!eye) return;
        eye.setAttribute('fill', '#535353');
        setTimeout(() => eye.setAttribute('fill', '#ffffff'), 100);
    }, 3000);
});
