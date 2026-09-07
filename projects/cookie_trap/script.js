/**
 * The Uncatchable "Accept Cookies" Banner - Logic
 * Corporate compliance as a combat sport.
 */

document.addEventListener('DOMContentLoaded', () => {
    const acceptBtn = document.getElementById('accept-btn');
    const modal = document.querySelector('.cookie-modal');
    const evasionNote = document.getElementById('evasion-note');

    let scale = 1.0;
    let frustrationLevel = 0;

    // Escalating commentary tracking how many times the button has fled
    const taunts = [
        "", "", "",
        "(It's getting away from you.)",
        "(The cookie does not wish to be accepted.)",
        "(Maybe it's the chase it enjoys.)",
        "(You and this button will grow old together.)",
        "(GDPR never specified the button had to hold still.)"
    ];
    function updateNote() {
        const idx = Math.min(Math.floor(frustrationLevel / 3), taunts.length - 1);
        evasionNote.textContent = taunts[idx];
    }

    // 1. Evasion Logic
    document.addEventListener('mousemove', (e) => {
        const btnRect = acceptBtn.getBoundingClientRect();
        
        // Calculate center of button
        const btnCenter = {
            x: btnRect.left + btnRect.width / 2,
            y: btnRect.top + btnRect.height / 2
        };

        // Distance from mouse to button center
        const distance = Math.sqrt(
            Math.pow(e.clientX - btnCenter.x, 2) + 
            Math.pow(e.clientY - btnCenter.y, 2)
        );

        // Proximity threshold
        if (distance < 80) {
            moveButton();
            shrinkButton();
        }
    });

    function moveButton() {
        // Find safe bounds within the modal
        const modalRect = modal.getBoundingClientRect();
        const btnRect = acceptBtn.getBoundingClientRect();

        // Target new coordinates relative to modal
        const maxX = modalRect.width - btnRect.width - 20;
        const maxY = modalRect.height - btnRect.height - 20;

        const nextX = Math.random() * maxX + 10;
        const nextY = Math.random() * maxY + 10;

        // Apply transform
        // Note: Initial position is in the flex flow, so we use translate from there
        acceptBtn.style.position = 'absolute';
        acceptBtn.style.left = `${nextX}px`;
        acceptBtn.style.top = `${nextY}px`;
        
        frustrationLevel++;
        if (frustrationLevel > 10) {
            acceptBtn.classList.add('shake');
        }
        updateNote();
    }

    function shrinkButton() {
        if (scale > 0.1) {
            scale *= 0.95;
            acceptBtn.style.transform = `scale(${scale})`;
            
            // Adjust font size linearly with scale to maintain visibility as long as possible
            const currentFontSize = parseInt(window.getComputedStyle(acceptBtn).fontSize);
            if (currentFontSize > 4) {
                acceptBtn.style.fontSize = `${14 * scale}px`;
                acceptBtn.style.padding = `${12 * scale}px ${24 * scale}px`;
            }
        }
        
        if (scale < 0.2) {
            acceptBtn.textContent = ".";
            acceptBtn.title = "Accept All (If you can see this)";
        }
    }

    // 2. Decline Interaction (Fake)
    const declineBtn = document.querySelector('.decline-btn');
    declineBtn.addEventListener('click', () => {
        const originalText = declineBtn.textContent;
        declineBtn.textContent = "Not a valid choice";
        declineBtn.classList.add('is-refused');

        setTimeout(() => {
            declineBtn.textContent = originalText;
            declineBtn.classList.remove('is-refused');
        }, 1500);
    });

    // 3. The Unlikely Success
    acceptBtn.addEventListener('click', () => {
        const msg = `Caught it after ${frustrationLevel} dodge${frustrationLevel === 1 ? '' : 's'}! Uploading your data to the sun…`;
        if (window.FX) FX.toast(msg, 3200);
        else alert(msg);
        setTimeout(() => location.reload(), 3200);
    });
});
