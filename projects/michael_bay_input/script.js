/**
 * The Michael Bay Text Input - Logic
 * Directed by: Javascript
 */

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input');
    const container = document.getElementById('search-container');
    const body = document.body;
    const soundToggle = document.getElementById('sound-toggle');

    const colors = ['#FF0055', '#00FF99', '#00CCFF', '#FFCC00', '#FF00FF', '#FFFFFF'];

    // --- Audio: a synthesized "airhorn/boom", finally fulfilling the old TODO ---
    let audioCtx = null;
    let soundOn = false;

    // Running timecode in the bottom matte — hours:minutes:seconds:frames.
    const timecode = document.getElementById('timecode');
    if (timecode) {
        const started = Date.now();
        const pad = (n) => String(n).padStart(2, '0');
        setInterval(() => {
            const total = (Date.now() - started) / 1000;
            timecode.textContent = [
                pad(Math.floor(total / 3600)),
                pad(Math.floor(total / 60) % 60),
                pad(Math.floor(total) % 60),
                pad(Math.floor((total % 1) * 24))
            ].join(':');
        }, 42);
    }

    soundToggle.addEventListener('click', () => {
        soundOn = !soundOn;
        soundToggle.textContent = soundOn ? 'SFX: On' : 'SFX: Off';
        if (soundOn && !audioCtx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (AC) audioCtx = new AC();
        }
    });

    function boom() {
        if (!soundOn || !audioCtx) return;
        const t = audioCtx.currentTime;

        // Low punchy "explosion" — a fast pitch drop with a quick decay
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.exponentialRampToValueAtTime(40, t + 0.18);
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.25, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.24);
    }

    input.addEventListener('input', () => {
        // Intensity scales with how much you've typed — escalating blockbuster energy
        const intensity = Math.min(input.value.length, 40) / 40; // 0 → 1
        triggerChaos(intensity);
    });

    function triggerChaos(intensity) {
        // 1. Violent Shake — applied to container, NOT body
        container.classList.remove('shake');
        void container.offsetWidth; // Trigger reflow
        container.classList.add('shake');

        // 2. Neon Flash — more frequent as intensity climbs
        if (Math.random() > 0.7 - intensity * 0.4) {
            body.classList.add('flash');
            setTimeout(() => body.classList.remove('flash'), 50);
        }

        // 3. Digital Shrapnel (Explosion)
        createExplosion(intensity);

        // 4. The airhorn
        boom();
    }

    function createExplosion(intensity) {
        const inputRect = input.getBoundingClientRect();
        const centerX = inputRect.left + inputRect.width / 2;
        const centerY = inputRect.top + inputRect.height / 2;

        const base = 15 + Math.floor(Math.random() * 10);
        const particleCount = base + Math.floor(intensity * 20);

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 10px ${color}`;

            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';

            // Random trajectory — bigger blasts at higher intensity
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * (300 + intensity * 250);
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            const duration = 0.4 + Math.random() * 0.6;
            particle.style.animation = `explode ${duration}s cubic-bezier(0.1, 0.9, 0.2, 1) forwards`;

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), duration * 1000);
        }
    }
});
