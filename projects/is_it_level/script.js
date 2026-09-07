/**
 * The "Is It Level?" Agitator - Logic
 * A study in the impossibility of absolute precision.
 */

document.addEventListener('DOMContentLoaded', () => {
    const frame = document.getElementById('art-frame');
    const slider = document.getElementById('tilt-slider');
    const statusBadge = document.getElementById('status');
    const attemptsDisplay = document.getElementById('attempts');

    let isSabotaging = false;
    let attempts = 0;

    // Escalating disappointment as the user keeps trying to find true level
    const snarks = [
        "ALMOST... NOPE.",
        "SO CLOSE. STILL WRONG.",
        "DID YOU SEE IT TILT? IT TILTED.",
        "PERFECTION IS A SOCIAL CONSTRUCT.",
        "HAVE YOU CONSIDERED THERAPY INSTEAD?",
        "THE HORIZON REJECTS YOU.",
        "LEVEL IS A STATE OF MIND. NOT THIS FRAME."
    ];
    let lastSnark = "";

    slider.addEventListener('input', (e) => {
        let value = parseFloat(e.target.value);

        // The Sabotage: Never allow exactly 0
        const tolerance = 0.2;

        if (Math.abs(value) < tolerance) {
            // Force jump away from center
            if (!isSabotaging) {
                isSabotaging = true;
                attempts++;
                attemptsDisplay.textContent = attempts;

                // Decide which way to jump based on previous direction or random
                const jumpTo = value >= 0 ? 0.35 : -0.35;

                // Visual snap
                frame.style.transition = 'transform 0.1s cubic-bezier(0.18, 0.89, 0.32, 1.28)';

                // Update slider and frame
                slider.value = jumpTo;
                updateFrame(jumpTo);

                // Snarky status update — escalates with persistence
                const idx = Math.min(attempts - 1, snarks.length - 1);
                lastSnark = (attempts <= snarks.length)
                    ? snarks[idx]
                    : (window.FX ? FX.pick(snarks, lastSnark) : snarks[Math.floor(Math.random() * snarks.length)]);
                statusBadge.textContent = lastSnark;
                statusBadge.classList.add('is-rejected');

                setTimeout(() => {
                    isSabotaging = false;
                    frame.style.transition = 'transform 0.05s ease-out';
                    statusBadge.textContent = "Adjustment required";
                    statusBadge.classList.remove('is-rejected');
                }, 400);
            }
        } else {
            updateFrame(value);
        }
    });

    function updateFrame(deg) {
        // Add a tiny bit of random jitter (0.02deg) so even if they let go, 
        // it feels slightly 'loose'
        const jitter = (Math.random() - 0.5) * 0.04;
        const totalRotation = deg + jitter;
        
        frame.style.transform = `rotate(${totalRotation}deg)`;
        
        // Mocking tooltips
        if (Math.abs(deg) < 1) {
            statusBadge.textContent = "Precision alignment…";
        }
    }

    // Initial state
    updateFrame(1.2);
});
