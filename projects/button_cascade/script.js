/**
 * The "Do Not Press" Button Cascade - Logic
 * Pure chaos as a service.
 */

document.addEventListener('DOMContentLoaded', () => {
    const mainButton = document.getElementById('main-button');
    const container = document.body;
    const hudCount = document.getElementById('hud-count');
    const hudMsg = document.getElementById('hud-msg');
    let buttonCount = 1;

    // Escalating commentary keyed to how out-of-hand things have gotten
    const milestones = [
        { at: 10,  msg: "That's... a few too many." },
        { at: 30,  msg: "You were explicitly told not to." },
        { at: 60,  msg: "There is no undo button. There is only press." },
        { at: 120, msg: "I'm not cleaning this up." },
        { at: 250, msg: "We have lost control of the situation." },
        { at: 500, msg: "This is your life now." },
    ];
    let lastMilestone = -1;

    const updateHud = () => {
        const total = buttonCount - 1; // main button doesn't count
        hudCount.textContent = total;
        for (let i = milestones.length - 1; i >= 0; i--) {
            if (total >= milestones[i].at && i > lastMilestone) {
                hudMsg.textContent = milestones[i].msg;
                lastMilestone = i;
                break;
            }
        }
    };

    // 1. Evasion Logic
    const setupEvasion = (btn) => {
        btn.addEventListener('mouseover', (e) => {
            // Only evade if there aren't TOO many buttons yet (performance/chaos balance)
            if (buttonCount < 50 || Math.random() > 0.5) {
                const maxX = window.innerWidth - btn.clientWidth - 50;
                const maxY = window.innerHeight - btn.clientHeight - 50;

                const nextX = Math.random() * maxX + 25;
                const nextY = Math.random() * maxY + 25;

                btn.style.left = `${nextX}px`;
                btn.style.top = `${nextY}px`;
                btn.style.transform = `scale(${0.8 + Math.random() * 0.4}) rotate(${Math.random() * 10 - 5}deg)`;
            }
        });
    };

    // 2. Duplication Logic
    const spawnButtons = (x, y) => {
        for (let i = 0; i < 10; i++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'glossy-button';
            btn.innerHTML = 'DO NOT<br>PRESS';
            
            // Random jitter as count increases
            if (buttonCount > 20) btn.classList.add('jitter');
            
            // Positioning
            const spread = 200 + (buttonCount * 2);
            const posX = Math.max(20, Math.min(window.innerWidth - 140, x + (Math.random() * spread - spread/2)));
            const posY = Math.max(20, Math.min(window.innerHeight - 140, y + (Math.random() * spread - spread/2)));
            
            btn.style.left = `${posX}px`;
            btn.style.top = `${posY}px`;
            btn.style.transform = `scale(0)`; // Animate in
            
            container.appendChild(btn);
            
            // Interaction
            setupEvasion(btn);
            btn.onclick = (e) => {
                e.stopPropagation();
                spawnButtons(e.clientX, e.clientY);
            };

            // Pop animation
            setTimeout(() => {
                btn.style.transform = `scale(${0.5 + Math.random() * 0.7})`;
            }, 10);

            buttonCount++;
        }

        // Visual Escalation
        if (buttonCount > 100) document.body.classList.add('breach-mode');

        updateHud();
    };

    // Initial Button Setup
    mainButton.onclick = (e) => {
        const rect = mainButton.getBoundingClientRect();
        spawnButtons(e.clientX || rect.left + rect.width / 2, e.clientY || rect.top + rect.height / 2);
    };
});
