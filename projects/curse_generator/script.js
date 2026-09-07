/* script.js */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Data Dictionary Arrays of Hyper-Specific Curses
    const curses = {
        general: [
            "May your USB plug always require three flips before it goes in.",
            "May both sides of your pillow always be slightly damp.",
            "May your socks perpetually slide down into your shoes.",
            "May you always step in a small drop of water right after putting on fresh socks.",
            "May your grocery bags always tear exactly three steps away from your front door.",
            "May you always feel a phantom vibration in your pocket when expecting a text.",
            "May every avocado you buy turn brown the moment you look away.",
            "May your Netflix always buffer exactly at the climax of the movie.",
            "May you constantly mix up 'their', 'there', and 'they're' in important emails.",
            "May you always forget exactly one crucial item when packing for a vacation.",
            "May your phone always reach 1% battery exactly when you need it most.",
            "May your automatic sink always turn off while your hands are still soapy.",
            "May your headphones always tangle in your pocket despite being carefully folded.",
            "May your microwave popcorn always have at least ten unpopped kernels.",
            "May you always find the perfect parking spot just as you realize you forgot your wallet.",
            "May the last fry always slip through the gap in the bag and into the seat.",
            "May your pen run out of ink exactly on the signature line.",
            "May every elevator close its doors the instant you start jogging toward it."
        ],
        drivers: [
            "May every traffic light turn red exactly 50 feet before you reach it.",
            "May your windshield wipers always leave one perfect streak right in your line of sight.",
            "May the car in front of you always drive precisely 2mph below the speed limit.",
            "May your Bluetooth disconnect every time a good song hits the chorus.",
            "May you always parallel park perfectly when no one is looking, but fail entirely when there's an audience.",
            "May every bird in the city decide your car is their favorite target today.",
            "May your GPS always announce 'Turn Left' exactly one second after you pass the turn.",
            "May you always get stuck behind a garbage truck on a narrow one-way street.",
            "May your high beams always flicker off when you're on a dark, winding road.",
            "May your gas light always come on exactly when you're 20 miles from the nearest station.",
            "May the lane you switch into always become the slow one within thirty seconds.",
            "May your phone always slide just out of reach the moment it starts ringing."
        ],
        exes: [
            "May every new person you date remind you slightly of your third-grade teacher.",
            "May you always run into your ex only on the days you decided to wear your 'laundry day' clothes.",
            "May your ex's name be a common word that you hear at least three times a day.",
            "May you accidentally double-tap their oldest Instagram photo while deep-diving at 2 AM.",
            "May your Netflix profile always show 'Continue Watching' for that one show you only watched with them.",
            "May you always find a single stray hair of theirs in your most comfortable sweater.",
            "May your ex always appear in your suggested friends list on the day you're feeling most lonely.",
            "May you always remember their birthday exactly one minute before the day ends.",
            "May you accidentally call your new partner by your ex's name in a crowded room.",
            "May you always hear 'your song' while sitting in a dentist's chair.",
            "May their new partner always be annoyingly, undeniably lovely.",
            "May autocorrect change every text to their name for exactly one week."
        ],
        coworkers: [
            "May your spacebar become slightly sticky only when your boss is watching.",
            "May you always join a Zoom call right as you take a large bite of food.",
            "May your chair slowly sink to the ground throughout the day without you noticing.",
            "May 'Reply-All' be the default option on every email you ever send.",
            "May your coffee always cool down to room temperature exactly 30 seconds faster than you intended.",
            "May your 'Mute' button always fail specifically when you're complaining about a meeting.",
            "May your coworkers always ask 'Quick question?' exactly two minutes before you log off.",
            "May you always be the one tasked with making the next pot of coffee when it's empty.",
            "May your shared spreadsheet always have one cell with a calculation error that only you can see.",
            "May your Slack status always show 'Active' when you're actually taking a nap.",
            "May every meeting that could have been an email become two meetings.",
            "May your laptop choose to install updates the moment you open it to present."
        ],
        roommates: [
            "May the toilet paper roll always have exactly one square left when you need it.",
            "May your internet connection drop specifically when you are winning a multiplayer game.",
            "May you never find the matching lid to any tupperware container again.",
            "May the microwave always beep one second before you reach it to stop it.",
            "May you always aggressively stub your pinky toe on the same table edge.",
            "May your roommate's alarm always go off three hours before they actually plan to wake up.",
            "May your favorite mug always be at the bottom of a sink full of someone else's dishes.",
            "May you always find an empty milk carton back in the fridge.",
            "May your roommate always decide to vacuum specifically while you're on an important call.",
            "May the communal sponge always be slightly too slimy to touch.",
            "May the last clean fork always be in the dishwasher mid-cycle.",
            "May someone always finish the snack and leave the empty box in the cupboard."
        ],
        tech: [
            "May every app update move the one button you use most.",
            "May your password always be 'one character too short' no matter what.",
            "May your screen rotate to landscape exactly when you don't want it to.",
            "May 'Are you still watching?' appear during the one episode you're fully invested in.",
            "May your wifi work everywhere except the one room you actually sit in.",
            "May every CAPTCHA insist that you have, in fact, not selected all the traffic lights.",
            "May your phone autocorrect 'ducking' forever, no matter how many times you fix it.",
            "May the loading bar always sit at 99% for an unreasonable amount of time.",
            "May your cursor land one pixel off the 'X' and open the ad instead.",
            "May 'unexpected error occurred' be the only error message you ever receive."
        ]
    };

    const labels = {
        general: "General Annoyance", drivers: "Bad Drivers", exes: "Exes",
        coworkers: "Coworkers", roommates: "Roommates", tech: "Tech / Online"
    };

    // 2. DOM Elements
    const categoryBtns = document.querySelectorAll('.cat-btn');
    const hexBtn = document.getElementById('hex-btn');
    const surpriseBtn = document.getElementById('surprise-btn');
    const copyBtn = document.getElementById('copy-btn');
    const curseText = document.getElementById('curse-text');
    const curseBox = document.getElementById('curse-display');
    const ecardToggle = document.getElementById('ecard-toggle');
    const hexCount = document.getElementById('hex-count');

    let currentCategory = 'general';
    let isEcardMode = false;
    let lastCurse = null;
    let castCount = 0;

    function setCategory(cat) {
        currentCategory = cat;
        categoryBtns.forEach(b => b.classList.toggle('active', b.dataset.category === cat));
    }

    // 3. Category Selection Logic
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => setCategory(btn.dataset.category));
    });

    // 4. Generation Engine — uses FX.pick to avoid repeating the same curse
    function castHex() {
        const arr = curses[currentCategory];
        const next = (window.FX ? FX.pick(arr, lastCurse) : arr[Math.floor(Math.random() * arr.length)]);
        lastCurse = next;
        castCount++;

        curseText.style.opacity = '0';
        curseBox.classList.remove('is-served'); // restart the stamp
        void curseBox.offsetWidth;
        setTimeout(() => {
            curseText.textContent = next;
            curseText.removeAttribute('data-pristine');
            curseText.style.opacity = '1';
            curseBox.classList.add('is-served');
        }, 150);

        hexCount.textContent = `${castCount} hex${castCount === 1 ? '' : 'es'} cast · target: ${labels[currentCategory]}`;
    }

    hexBtn.addEventListener('click', castHex);

    // Surprise me — pick a random category, then cast
    surpriseBtn.addEventListener('click', () => {
        const cats = Object.keys(curses);
        setCategory(cats[Math.floor(Math.random() * cats.length)]);
        castHex();
    });

    // Copy current curse
    copyBtn.addEventListener('click', () => {
        const text = curseText.textContent.trim();
        if (!text || curseText.dataset.pristine) {
            if (window.FX) FX.toast('File a request first.');
            return;
        }
        if (window.FX) FX.copy(text);
    });

    // Keyboard: Space / Enter casts a hex (when not typing in a field)
    document.addEventListener('keydown', (e) => {
        if ((e.code === 'Space' || e.code === 'Enter') &&
            !['INPUT', 'TEXTAREA', 'BUTTON'].includes(document.activeElement.tagName)) {
            e.preventDefault();
            castHex();
        }
    });

    // 5. E-Card Toggle State
    ecardToggle.addEventListener('click', () => {
        isEcardMode = !isEcardMode;
        curseBox.classList.toggle('ecard-mode', isEcardMode);
        ecardToggle.textContent = isEcardMode
            ? 'Back to the official notice'
            : 'Send it as a greeting card';
    });
});
