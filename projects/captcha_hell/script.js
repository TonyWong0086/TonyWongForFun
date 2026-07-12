/**
 * CAPTCHA Hell - Logic
 * Existential frustration as a service.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Data & State
    let currentStep = 0;
    let startTime = 0;
    let clickCount = 0;
    const abstractPrompts = [
        "a sense of lingering regret",
        "squares that feel vaguely threatening",
        "objects you missed as a child",
        "vibrations of impending doom",
        "the smell of a Tuesday in November",
        "pixelated existential dread",
        "the concept of Tuesday, but spatially",
        "squares that would not return your texts",
        "the exact shade of your last good idea",
        "motorcycles (there are no motorcycles)"
    ];

    const shantyLines = [
        "Soon may the Wellerman come",
        "To bring us sugar and tea and rum",
        "One day when the tonguing is done",
        "We'll take our leave and go"
    ];

    // 2. DOM Elements
    const widget = document.getElementById('widget');
    const step0 = document.getElementById('step-0');
    const stepGrid = document.getElementById('step-grid');
    const stepAudio = document.getElementById('step-audio');
    const captchaGrid = document.getElementById('captcha-grid');
    const gridPrompt = document.getElementById('grid-prompt');
    const essayModal = document.getElementById('essay-modal');
    const essayInput = document.getElementById('essay-input');
    const wordCount = document.getElementById('word-count');
    const statusLog = document.getElementById('status-log');
    const audioInput = document.getElementById('audio-input');
    const loopCounter = document.getElementById('loop-counter');

    let attempts = 0;
    const bumpAttempts = () => {
        attempts++;
        loopCounter.textContent = `Verification attempts: ${attempts}`;
    };

    // WebAudio: an actually-distorted, genuinely unhelpful "shanty"
    let audioCtx = null;
    function playNoise() {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        if (!audioCtx) audioCtx = new AC();
        const ctx = audioCtx;
        const t = ctx.currentTime;
        // A cluster of detuned tones warbling randomly — incomprehensible by design
        for (let i = 0; i < 3; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = ['square', 'sawtooth', 'triangle'][i];
            osc.frequency.setValueAtTime(200 + Math.random() * 400, t);
            osc.frequency.linearRampToValueAtTime(120 + Math.random() * 500, t + 1);
            gain.gain.setValueAtTime(0.06, t);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
            osc.connect(gain).connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 1.1);
        }
    }

    // 3. Level 1: Widget Entry
    window.startChallenge = () => {
        document.getElementById('check-icon').classList.remove('opacity-0');
        document.getElementById('check-icon').classList.add('opacity-100');
        
        log("INITIATING HUMANITY CHECK...");
        startTime = Date.now();
        
        setTimeout(() => {
            step0.classList.add('hidden');
            stepGrid.classList.remove('hidden');
            renderGrid();
        }, 800);
    };

    // 4. Level 2: Grid Logic
    function renderGrid() {
        gridPrompt.textContent = abstractPrompts[Math.floor(Math.random() * abstractPrompts.length)];
        captchaGrid.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = "aspect-square bg-slate-100 border border-slate-200 grid-cell cursor-pointer flex items-center justify-center overflow-hidden h-24";
            
            // Random abstract SVG shapes
            const hue = Math.floor(Math.random() * 360);
            const rot = Math.floor(Math.random() * 360);
            cell.innerHTML = `
                <svg class="w-12 h-12 opacity-40 group-hover:opacity-100 transition-opacity" style="transform: rotate(${rot}deg)" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-width="0.5" d="${generateRandomPath()}" stroke="hsl(${hue}, 30%, 50%)" />
                </svg>
            `;
            
            cell.onclick = () => {
                cell.classList.toggle('selected');
                clickCount++;
            };
            captchaGrid.appendChild(cell);
        }
    }

    function generateRandomPath() {
        const points = Array.from({length: 4}, () => `${Math.random()*24},${Math.random()*24}`).join(' L ');
        return `M ${Math.random()*24},${Math.random()*24} L ${points} Z`;
    }

    window.verifyGrid = () => {
        const timeTaken = Date.now() - startTime;
        bumpAttempts();

        // Anti-speed trap
        if (timeTaken < 3000) {
            triggerEssayTrap();
            return;
        }

        // Sometimes it just... makes you do it again. No reason given.
        if (Math.random() < 0.35) {
            log("HMM. LET'S TRY ANOTHER ONE.");
            startTime = Date.now();
            renderGrid();
            return;
        }

        log("UNCERTAINTY DETECTED... RE-VERIFYING.");
        widget.classList.add('glitch-text');
        
        setTimeout(() => {
            widget.classList.remove('glitch-text');
            stepGrid.classList.add('hidden');
            stepAudio.classList.remove('hidden');
        }, 1500);
    };

    // 5. Level 3: Audio (Fake)
    window.playDistortedAudio = () => {
        log("TRANSMITTING SHANTY...");
        playNoise(); // genuine (useless) distorted audio
        const bars = document.querySelectorAll('#audio-waveform div');
        bars.forEach(bar => {
            bar.style.height = `${Math.random()*100}%`;
            bar.classList.add('duration-75');
        });

        setTimeout(() => bars.forEach(bar => bar.style.height = '10%'), 1000);
    };

    window.verifyAudio = () => {
        const input = audioInput.value.toLowerCase().trim();
        bumpAttempts();
        if (input.length < 5) {
            log("INSUFFICIENT HUMANITY IN RESPONSE.");
            return;
        }

        log("ANALYZING REVERSE PHONETICS...");
        setTimeout(() => {
            log("CRITICAL ERROR: DIGNITY_NOT_FOUND");
            triggerEssayTrap();
        }, 2000);
    };

    // 6. The Ultimate Trap: Essay
    function triggerEssayTrap() {
        log("MALICIOUS ENTITY DETECTED. LOCKDOWN ACTIVE.");
        essayModal.classList.remove('hidden');
        essayModal.classList.add('flex');
    }

    essayInput.addEventListener('input', () => {
        const count = essayInput.value.split(/\s+/).filter(w => w.length > 0).length;
        wordCount.textContent = `Words: ${count} / 500`;
        
        // Glitch the UI if they type 'E'
        if (essayInput.value.toLowerCase().includes('e')) {
            document.body.style.backgroundColor = '#fee2e2';
            log("FORBIDDEN CHARACTER 'E' DETECTED.");
            setTimeout(() => document.body.style.backgroundColor = '#f5f5f5', 500);
        }
    });

    window.submitHumanityEssay = () => {
        const msg = "HUMANITY REJECTED: too much logic. Please be born again and return in 18 years.";
        if (window.FX) FX.toast(msg, 3500);
        else alert(msg);
        setTimeout(() => location.reload(), 3500);
    };

    function log(msg) {
        statusLog.textContent = `[${msg}]`;
        statusLog.classList.remove('opacity-50');
        setTimeout(() => statusLog.classList.add('opacity-50'), 2000);
    }
});
