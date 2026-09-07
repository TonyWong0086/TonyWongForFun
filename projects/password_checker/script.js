/* script.js - Passive-Aggressive Password Checker */

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    const clearBtn = document.getElementById('clear-btn');
    const strengthBar = document.getElementById('strength-bar');
    const strengthLabel = document.getElementById('strength-label');
    const judgmentPanel = document.getElementById('judgment-panel');
    const judgmentText = document.getElementById('judgment-text');
    const pityScore = document.getElementById('pity-score');
    const pityText = document.getElementById('pity-text');
    const attemptCountEl = document.getElementById('attempt-count');
    const sarcasmBanner = document.getElementById('sarcasm-banner');
    const crackTimeEl = document.getElementById('crack-time');

    let attemptCount = 0;
    let judgmentTimeout;

    const roasts = {
        empty: "Go ahead, type something predictable...",
        tooShort: "Is that the password or the number of friends you have? It's too short.",
        common: "Password123? Really? My grandmother's toaster could brute-force this in four seconds. Do better.",
        dog: "Is that your dog's name? Do you also leave your front door wide open when you go on vacation?",
        simple: "A singular word. How minimalist. How insecure. How expected.",
        numerical: "Just numbers? Are you trying to secure a bank account or a calculator from 1994?",
        strongish: "Getting better. It might take a hacker at least a few minutes. Maybe they'll stop for coffee first.",
        godLevel: "Wow. A complex password. Who are you hiding from? The NSA? Or just your own lack of self-esteem?",
        personal: "This looks like a birth year. Or a locker combination. Either way, it's embarrassing."
    };

    const sarcasticBanners = [
        "",
        "First attempt? Cute.",
        "A second try? You're really committed to this.",
        "Three tries? Most people give up on their security by now.",
        "Four! You really want that 100% score, don't you?",
        "Five attempts. I'm starting to feel a bit bad for you.",
        "Six. Just stop. You're trying too hard to impress a piece of code.",
        "Seven. Do you have a job? Or a hobby? Besides this?",
        "Eight. I'm literally just a set of if-statements. Why do you care what I think?",
        "NINE. This is getting weird. Take a break.",
        "TEN! Achievement unlocked: Absolute Perseverance (and also probably no social life)."
    ];

    passwordInput.addEventListener('input', (e) => {
        const val = e.target.value;
        
        if (val.length > 0) {
            clearBtn.classList.remove('hidden');
            judgmentPanel.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
            judgmentPanel.classList.add('hidden');
            strengthBar.style.width = '0';
            strengthLabel.textContent = 'Waiting...';
            strengthLabel.className = 'strength-label is-idle';
            return;
        }

        analyzePassword(val);
    });

    clearBtn.addEventListener('click', () => {
        passwordInput.value = '';
        passwordInput.dispatchEvent(new Event('input'));
        passwordInput.focus();
    });

    function analyzePassword(password) {
        let score = 0;
        let feedback = "";
        let pity = 0;
        let pityDesc = "";

        // Attempt counting (debounce to only count meaningful changes or after pauses)
        clearTimeout(judgmentTimeout);
        judgmentTimeout = setTimeout(() => {
            attemptCount++;
            attemptCountEl.textContent = attemptCount;
            updateSarcasmBanner();
        }, 1000);

        // Score logic
        if (password.length > 0) score += 10;
        if (password.length >= 8) score += 20;
        if (password.length >= 12) score += 20;
        if (/[A-Z]/.test(password)) score += 15;
        if (/[0-9]/.test(password)) score += 15;
        if (/[^A-Za-z0-9]/.test(password)) score += 20;

        // Peak at 100
        if (score > 100) score = 100;

        // Judgment Logic
        const lower = password.toLowerCase();
        const isKeyboardWalk = /qwert|asdf|zxcv|12345|abcd/.test(lower);
        const looksLikeYear = /\b(19|20)\d{2}\b/.test(password) && password.length <= 8;

        if (password.toLowerCase() === 'password' || password.includes('123')) {
            feedback = roasts.common;
            pity = 95;
            pityDesc = "A hacker would actually feel bad for you. They might even leave a tip in your empty bank account.";
            score = 5;
        } else if (isKeyboardWalk) {
            feedback = roasts.dog;
            pity = 88;
            pityDesc = "Your fingers walked in a straight line. So will the hacker, right into your account.";
            score = 8;
        } else if (looksLikeYear) {
            feedback = roasts.personal;
            pity = 75;
            pityDesc = "A four-digit year is the security equivalent of hiding your key under the mat.";
            score = Math.min(score, 25);
        } else if (password.length < 6) {
            feedback = roasts.tooShort;
            pity = 80;
            pityDesc = "This is less of a password and more of a suggestion. A very weak one.";
        } else if (/^\d+$/.test(password)) {
            feedback = roasts.numerical;
            pity = 70;
            pityDesc = "Numbers are for math, not for security. At least try a letter.";
        } else if (score < 40) {
            feedback = roasts.simple;
            pity = 60;
            pityDesc = "Basic. Boring. Exposed.";
        } else if (score < 80) {
            feedback = roasts.strongish;
            pity = 20;
            pityDesc = "They might have to work for it for 30 seconds. How inconvenient for them.";
        } else {
            feedback = roasts.godLevel;
            pity = 2;
            pityDesc = "Even a Russian bot would pass this over. You're safe, but at what cost to your memory?";
        }

        // Apply UI updates
        updateUI(score, feedback, pity, pityDesc);
        crackTimeEl.textContent = estimateCrackTime(password);
    }

    // A cheerfully unscientific "time to crack" estimate.
    function estimateCrackTime(pw) {
        let charset = 0;
        if (/[a-z]/.test(pw)) charset += 26;
        if (/[A-Z]/.test(pw)) charset += 26;
        if (/[0-9]/.test(pw)) charset += 10;
        if (/[^A-Za-z0-9]/.test(pw)) charset += 33;
        if (charset === 0) return "—";

        // Instant verdict for the obvious offenders
        if (pw.toLowerCase() === 'password' || pw.includes('123')) return "already in a dictionary";

        const guessesPerSec = 1e10; // a beefy attacker
        const combos = Math.pow(charset, pw.length);
        const seconds = combos / 2 / guessesPerSec;

        if (seconds < 1) return "less time than this took to type";
        const units = [
            [60, 'seconds'], [60, 'minutes'], [24, 'hours'],
            [365, 'days'], [100, 'years'], [Infinity, 'centuries']
        ];
        let val = seconds, label = 'seconds';
        for (const [div, name] of units) {
            label = name;
            if (val < div) break;
            val /= div;
        }
        if (label === 'centuries' && val > 1000) return "longer than the universe has existed";
        return `${val < 10 ? val.toFixed(1) : Math.round(val)} ${label}`;
    }

    function updateUI(score, feedback, pity, pityDesc) {
        strengthBar.style.width = `${score}%`;
        
        // Color shifts
        if (score < 30) {
            strengthBar.style.backgroundColor = '#ef4444';
            strengthLabel.textContent = 'Tragic';
            strengthLabel.className = 'strength-label is-tragic';
        } else if (score < 70) {
            strengthBar.style.backgroundColor = '#f59e0b';
            strengthLabel.textContent = 'Mediocre';
            strengthLabel.className = 'strength-label is-mediocre';
        } else {
            strengthBar.style.backgroundColor = '#22c55e';
            strengthLabel.textContent = 'Try-Hard';
            strengthLabel.className = 'strength-label is-tryhard';
        }

        judgmentText.textContent = feedback;
        pityScore.textContent = `${pity}%`;
        pityText.textContent = pityDesc;
    }

    function updateSarcasmBanner() {
        if (attemptCount > 0) {
            sarcasmBanner.classList.remove('hidden');
            const msg = sarcasticBanners[Math.min(attemptCount, sarcasticBanners.length - 1)];
            sarcasmBanner.textContent = msg;
            
            // Subtle shake effect
            sarcasmBanner.classList.add('shake');
            setTimeout(() => sarcasmBanner.classList.remove('shake'), 300);
        }
    }
});
