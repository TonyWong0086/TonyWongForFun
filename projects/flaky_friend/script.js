/**
 * The Flaky Friend Excuse Generator - Logic
 * Mathematically perfect last-minute cancellations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Excuse Arrays
    const setups = [
        "I can't make it tonight, my",
        "So sorry, I'm stuck at home because my",
        "Change of plans, unfortunately my",
        "Hey, I'm going to have to bail. My",
        "Ugh, I'm so annoyed but my",
        "Look, I know this looks bad, but my"
    ];

    const subjects = [
        "landlord",
        "cat",
        "sleep paralysis demon",
        "spiritual advisor",
        "competitive sourdough starter",
        "roommate's suspicious orchid",
        "childhood imaginary friend",
        "Uber driver's second cousin",
        "neighbor's emotional support parrot",
        "local cryptid"
    ];

    const actions = [
        "is demanding a blood sacrifice.",
        "trapped me in a conversation about crypto.",
        "accidentally ate my keys.",
        "is holding a spontaneous vigil for dial-up internet.",
        "locked me in the pantry until I 'find myself'.",
        "needs me to help hide a very large, rectangular box.",
        "just discovered fire and things are getting 'intense'.",
        "wants to discuss the 'vibe shift' in detail.",
        "fell into a localized time-vortex in the hallway.",
        "is currently convinced I'm a figment of their imagination."
    ];

    // Friend's reactions, bucketed by how plausible the excuse landed
    const replies = {
        low: [
            "lmao. sure.",
            "you typed all that instead of just saying no 😂",
            "I'm screenshotting this for the group chat.",
            "incredible. zero notes. completely fake.",
            "we both know you're already in your pajamas."
        ],
        mid: [
            "...go on.",
            "weirdly I kind of believe you?",
            "okay but you owe me details tomorrow.",
            "this is suspicious but I'm tired so fine.",
            "I'll allow it. barely."
        ],
        high: [
            "oh no, that's actually serious. take care!! ❤️",
            "wait that's terrifying, are you okay??",
            "say no more, family first 🙏",
            "ugh that's the worst. rain check for sure.",
            "totally understandable, go handle it!"
        ]
    };

    // 2. DOM Elements
    const thread = document.getElementById('dynamic-messages');
    const container = document.getElementById('thread');
    const typingIndicator = document.getElementById('typing-indicator');
    const copyBtn = document.getElementById('copy-btn');
    const believeWrap = document.getElementById('believability');
    const believeBar = document.getElementById('believe-bar');
    const believePct = document.getElementById('believe-pct');
    let lastExcuse = "";
    let busy = false;

    const pick = (arr, avoid) => window.FX ? FX.pick(arr, avoid)
        : arr[Math.floor(Math.random() * arr.length)];

    const scrollDown = () => container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });

    function showTyping() {
        typingIndicator.classList.remove('hidden');
        container.appendChild(typingIndicator); // keep it at the bottom
        scrollDown();
    }
    function hideTyping() { typingIndicator.classList.add('hidden'); }

    function addReceived(text) {
        const b = document.createElement('div');
        b.className = 'bubble received';
        b.textContent = text;
        thread.appendChild(b);
        scrollDown();
    }

    function setBelievability(score) {
        believeWrap.classList.remove('hidden');
        believePct.textContent = score + '%';
        believeBar.style.width = score + '%';
        believeBar.style.background =
            score < 34 ? '#ff3b30' : score < 67 ? '#ff9500' : '#34c759';
    }

    // 3. Generator Logic
    window.generateExcuse = () => {
        if (busy) return;
        busy = true;

        // Clear previous "Delivered" receipts
        document.querySelectorAll('.receipt').forEach(r => r.remove());

        showTyping();

        setTimeout(() => {
            hideTyping();

            const setup = pick(setups);
            const subject = pick(subjects, lastSubject);
            const action = pick(actions);
            lastSubject = subject;
            lastExcuse = `${setup} ${subject} ${action}`;

            const bubble = document.createElement('div');
            bubble.className = "bubble sent";
            bubble.textContent = lastExcuse;

            const receipt = document.createElement('div');
            receipt.className = "receipt";
            receipt.textContent = "Delivered";

            thread.appendChild(bubble);
            thread.appendChild(receipt);
            copyBtn.classList.remove('hidden');
            scrollDown();

            // Score believability and let the friend react
            const score = Math.floor(Math.random() * 96) + 3; // 3–98
            setBelievability(score);
            const tier = score < 34 ? 'low' : score < 67 ? 'mid' : 'high';

            setTimeout(() => {
                showTyping();
                setTimeout(() => {
                    hideTyping();
                    addReceived(pick(replies[tier]));
                    busy = false;
                }, 1100);
            }, 700);

        }, 1200); // Artificial delay for 'typing' feel
    };
    let lastSubject = "";

    // 4. Clipboard Logic — uses the shared FX helper (with fallback)
    window.copyToClipboard = () => {
        if (!lastExcuse) return;
        if (window.FX) { FX.copy(lastExcuse); return; }
        navigator.clipboard && navigator.clipboard.writeText(lastExcuse);
    };
});
