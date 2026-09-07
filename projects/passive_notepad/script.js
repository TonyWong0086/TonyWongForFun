/**
 * The Passive-Aggressive Notepad - Logic
 * Minimalist design meets high-frequency sabotage.
 */

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const wordCountDisplay = document.getElementById('word-count');
    const correctionsDisplay = document.getElementById('corrections');
    const toast = document.getElementById('toast');

    let corrections = 0;
    const tallyCorrection = () => {
        corrections++;
        correctionsDisplay.textContent =
            `${corrections} HELPFUL CORRECTION${corrections === 1 ? '' : 'S'}`;
        correctionsDisplay.classList.add('just-helped');
        setTimeout(() => correctionsDisplay.classList.remove('just-helped'), 120);
    };

    // Configuration
    const CHANCE_OF_CHAOS = 0.15; // 15% of keystrokes
    const LAG_DURATION = 1500; // 1.5 seconds

    const emojiSwaps = {
        '.': '💅',
        ',': '✨',
        '!': '🙄',
        '?': '🤷',
        ':': '👀',
        ';': '🐍'
    };

    const sarcasticToasts = [
        "Feedback received. We've adjusted your input for tone parity.",
        "That word choice was... bold. Try again?",
        "Our AI detected a lack of ✨ pizazz ✨ in that sentence.",
        "Input delay added to improve your patience.",
        "Was that character strictly necessary? We didn't think so.",
        "Your keyboard seems a bit 'moody' today. Fixed it for you."
    ];

    let keystrokeCount = 0;

    // Sabotage logic
    editor.addEventListener('keydown', (e) => {
        // Don't sabotage control keys
        if (e.ctrlKey || e.altKey || e.metaKey || e.key === 'Escape') return;
        
        keystrokeCount++;

        // 1. Roll for Chaos
        if (Math.random() < CHANCE_OF_CHAOS) {
            e.preventDefault();
            tallyCorrection();

            const chaosType = Math.random();

            // A. Random Capitalization (33%)
            if (chaosType < 0.33) {
                const char = e.key.length === 1 ? e.key : "";
                if (char) {
                    const modified = Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
                    insertAtCursor(modified);
                }
            } 
            // B. Punctuation Swap (33%)
            else if (chaosType < 0.66) {
                if (emojiSwaps[e.key]) {
                    insertAtCursor(emojiSwaps[e.key]);
                    showToast();
                } else {
                    // Fallback to ghost deletion
                    ghostDelete();
                }
            }
            // C. Artificial Lag (34%)
            else {
                const char = e.key;
                showToast("Hardware anomaly detected. Retrying input...");
                setTimeout(() => {
                    // We can't easily prevent default and THEN insert if we wait, 
                    // so we just insert the character after the delay.
                    insertAtCursor(char);
                }, LAG_DURATION);
            }
        }
    });

    // Word count update
    editor.addEventListener('input', () => {
        const text = editor.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        wordCountDisplay.textContent = `${words} WORD${words === 1 ? '' : 'S'}`;
        
        // Visual feedback
        editor.classList.add('typing-glow');
        setTimeout(() => editor.classList.remove('typing-glow'), 500);
    });

    // Helper: Insert text at cursor position
    function insertAtCursor(text) {
        if (!text) return;
        
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const value = editor.value;

        editor.value = value.substring(0, start) + text + value.substring(end);
        
        // Restore cursor position
        editor.selectionStart = editor.selectionEnd = start + text.length;
        
        // Trigger input event manually for word count
        editor.dispatchEvent(new Event('input'));
    }

    // Helper: Randomly delete character
    function ghostDelete() {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        if (start === 0) return;

        editor.value = editor.value.substring(0, start - 1) + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start - 1;
        showToast("Stability issue? We've removed that for your safety.");
        editor.dispatchEvent(new Event('input'));
    }

    // Helper: Show toast notification
    function showToast(message) {
        toast.textContent = message || sarcasticToasts[Math.floor(Math.random() * sarcasticToasts.length)];
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
});
