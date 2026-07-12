/**
 * The "Important Update" Decoy Screen - Logic
 * Keeping users looking productive since 2026.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Technobabble Data
    const tasks = [
        "Reticulating splines...",
        "Negotiating with the router...",
        "Defragmenting the cloud...",
        "Downloading more RAM...",
        "Recalibrating flux capacitors...",
        "Syncing neural pathways...",
        "Compiling existential dread...",
        "Normalizing database gravity...",
        "Compressing vacuum particles...",
        "Waking up the CPU...",
        "Polishing the pixels...",
        "Verifying human-AI harmony...",
        "Decrypting the mainframe's dreams...",
        "Optimizing the binary landscape...",
        "Refreshing the flux..."
    ];

    // 2. DOM Elements
    const statusTask = document.getElementById('status-task');
    const progressFill = document.getElementById('progress-fill');
    const percentageText = document.getElementById('percentage-text');
    const etaText = document.getElementById('eta-text');
    const abortModal = document.getElementById('abort-modal');
    const abortCancel = document.getElementById('abort-cancel');

    let currentProgress = 0;

    // 3. Logic: Infinite Progress (forever approaching, occasionally betraying you)
    const updateProgress = () => {
        if (currentProgress < 99) {
            // Slower and slower as it approaches 100...
            const increment = (100 - currentProgress) * 0.01 * Math.random();
            currentProgress += increment;

            // ...and every so often, a humbling setback.
            if (currentProgress > 40 && Math.random() < 0.03) {
                currentProgress = Math.max(0, currentProgress - Math.random() * 30);
                statusTask.textContent = "Rolling back unexpected changes...";
            }

            progressFill.style.width = `${currentProgress}%`;
            percentageText.textContent = `Preparing: ${currentProgress.toFixed(2)}%`;
        } else {
            // Just wiggle endlessly at 99%
            currentProgress = 99 + (Math.random() * 0.5);
            percentageText.textContent = `Finalizing: ${currentProgress.toFixed(2)}%`;
        }
    };

    // 3b. Logic: an estimate that only ever gets worse
    let etaMinutes = 14;
    const updateEta = () => {
        // Drift upward, sometimes wildly
        etaMinutes += Math.random() < 0.5 ? Math.random() * 3 : -Math.random();
        if (etaMinutes < 2) etaMinutes = 2 + Math.random() * 5;
        const h = Math.floor(etaMinutes / 60);
        const m = Math.floor(etaMinutes % 60);
        const label = h > 0 ? `${h} HR ${m} MIN` : `${m} MIN`;
        etaText.textContent = `ESTIMATED TIME REMAINING: ${label}`;
    };

    // 4. Logic: cycling Nonsense Text
    const updateStatusText = () => {
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        statusTask.style.opacity = '0';
        
        setTimeout(() => {
            statusTask.textContent = randomTask;
            statusTask.style.opacity = '1';
        }, 500);
    };

    // Intervals
    setInterval(updateProgress, 100);
    setInterval(updateStatusText, 4000);
    setInterval(updateEta, 3000);

    // 5. ESC opens the fake "abort" dialog; Esc again / button dismisses it
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        abortModal.classList.toggle('hidden');
    });
    abortCancel.addEventListener('click', () => abortModal.classList.add('hidden'));

    // Initial Kickoff
    updateStatusText();
    updateEta();
});
