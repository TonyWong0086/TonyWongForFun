/**
 * Break-In Simulator: The Reverse Escape Room
 * Logic for mundane high-stakes heists.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Data Pools
    const itemPool = [
        { id: 'item_granola', name: 'Granola Bar', icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4H4v7m14 0v7h-7m-2 2H4v-7m16 0V4h-7M3.172 5.172a4 4 0 005.656 5.656L12 8.5l3.172 3.172a4 4 0 005.656-5.656L17.5 4h-11l-3.328 1.172z"/></svg>`, desc: 'Half-eaten. Slightly sticky.' },
        { id: 'item_battery', name: 'AAA Battery', icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/></svg>`, desc: 'Might have 2% charge left.' },
        { id: 'item_card', name: 'Library Card', icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>`, desc: 'Expired in 2011. Laminated.' },
        { id: 'item_paperclip', name: 'Paperclip', icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>`, desc: 'Bent into a roughly straight line.' },
        { id: 'item_napkin', name: 'Damp Napkin', icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>`, desc: 'Smells faintly of lemon cleaner.' },
        { id: 'item_penny', name: 'Penny', icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`, desc: 'Found in a parking lot. Lucky?' }
    ];

    const failMessages = {
        item_card: "The target node doesn't recognize your credentials. It's a library card, not a master key.",
        item_granola: "You try to feed the object. It remains indifferent to your nutritional offering.",
        item_battery: "You look for a battery compartment. There isn't one. The object remains unpowered.",
        item_paperclip: "You poke around. You've achieved nothing except potentially scratching the finish.",
        item_napkin: "You wipe the surface. It's cleaner now, but still very much locked.",
        item_penny: "You try to pay the object. It doesn't accept bribes under 5 cents."
    };

    // 2. Game State
    let currentMission = null;
    let inventory = [];
    let missionStep = 0;
    let boredomLevel = 0;
    
    // Hacking game state
    let hackPattern = [];
    let userPattern = [];
    let isHacking = false;

    const missions = {
        dmv: {
            name: "OP: TICKET_MASTER",
            steps: [
                {
                    msg: "You are outside the DMV. The double doors are locked.",
                    target: 'doors', validItem: 'item_card',
                    successMsg: "The library card slips past the latch. Modern security is no match for 2011 lamination.",
                    visual: `<svg class="w-24 h-24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>`
                },
                {
                    msg: "You're in the lobby. The ticket machine requires basic logic bypass.",
                    target: 'dispenser', isHacking: true,
                    successMsg: "Hacking sequence COMPLETE. The terminal flickers with bureaucratic life.",
                    visual: `<svg class="w-24 h-24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"/></svg>`
                },
                {
                    msg: "Machine ON. Security sensor is hungry for a bribe.",
                    target: 'sensor', validItem: 'item_granola',
                    successMsg: "You smear granola over the sensor. It malfunctions and spits out ticket #402. SUCCESS.",
                    visual: `<svg class="w-24 h-24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>`
                }
            ]
        },
        restaurant: {
            name: "OP: BREADSTICK_REBELS",
            steps: [
                {
                    msg: "The kitchen's high-tech lock is jammed with ancient grease.",
                    target: 'lock', validItem: 'item_napkin',
                    successMsg: "You wipe away the structural grease with the damp napkin. The keypad is now visible.",
                    visual: `<svg class="w-24 h-24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v3m0 0h.01m-.01 0H12m0-3h12m0 0h.01m-.01 0H24m-12 0H0m0 0h.01m-.01 0H0m12 0V3m0 0h.01m-.01 0H12"/></svg>`
                },
                {
                    msg: "The keypad requires a pattern bypass.",
                    target: 'keypad', isHacking: true,
                    successMsg: "Keypad bypassed. A faint smell of garlic bread wafts through the door.",
                    visual: `<svg class="w-24 h-24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3h6m-6 4h6m-6 4h6m-6 4h6M9 21h6"/></svg>`
                },
                {
                    msg: "The breadstick vault is protected by a weight-sensitive pedestal.",
                    target: 'pedestal', validItem: 'item_penny',
                    successMsg: "You swap the formula for a penny. The weight is close enough. Mission Accomplished.",
                    visual: `<svg class="w-24 h-24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A3.375 3.375 0 015.625 8.625h12.75c.621 0 1.125.504 1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621-.504 1.125-1.125 1.125H5.625a1.125 1.125 0 01-1.125-1.125v-3.026a2.999 2.999 0 010-5.198V9.375c0-.621.504-1.125 1.125-1.125h12.75"/></svg>`
                }
            ]
        },
        dentist: {
            name: "OP: WAITING_ROOM",
            steps: [
                {
                    msg: "Front desk is barricaded. The sliding glass requires manual override.",
                    target: 'glass', validItem: 'item_paperclip',
                    successMsg: "You jam the paperclip into the track. The glass slides open with a screech.",
                    visual: `<svg class="w-24 h-24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>`
                },
                {
                    msg: "The computer's screensaver is a high-intensity slideshow of teeth.",
                    target: 'pc', isHacking: true,
                    successMsg: "Boredom levels critical. You've bypassed the desktop lock.",
                    visual: `<svg class="w-24 h-24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg>`
                },
                {
                    msg: "Mission Target: People Magazine (May 2014).",
                    target: 'magazine', validItem: 'item_granola',
                    successMsg: "You mark your page with a granola smear. SUCCESS.",
                    visual: `<svg class="w-24 h-24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253"/></svg>`
                }
            ]
        },
        library: {
            name: "OP: OVERDUE_BOOKS",
            steps: [
                {
                    msg: "The return slot is jammed with three copies of 'Twilight'.",
                    target: 'slot', validItem: 'item_paperclip',
                    successMsg: "You use the paperclip to hook the books and clear the path.",
                    visual: `<svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`
                },
                {
                    msg: "The library's legacy computer system uses a COBOL-based firewall.",
                    target: 'terminal', isHacking: true,
                    successMsg: "COBOL bypassed. You've scrubbed the 50-cent fine from the database.",
                    visual: `<svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`
                },
                {
                    msg: "Exfiltration point: The 'Silent Study Zone'.",
                    target: 'zone', validItem: 'item_napkin',
                    successMsg: "You use the damp napkin to muffle the sound of your footsteps. SUCCESS.",
                    visual: `<svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>`
                }
            ]
        }
    };

    // 3. DOM Elements
    const hub = document.getElementById('mission-hub');
    const gameplay = document.getElementById('gameplay-area');
    const success = document.getElementById('success-screen');
    const systemMsg = document.getElementById('system-msg');
    const commsLog = document.getElementById('comms-log');
    const inventoryGrid = document.getElementById('inventory-grid');
    const sceneVisual = document.getElementById('scene-visual');
    const interactionLayer = document.getElementById('interaction-layer');
    const boredomBar = document.getElementById('boredom-bar');
    const hackTerminal = document.getElementById('hacking-terminal');
    const hackGrid = document.getElementById('hacking-grid');
    const hackStatus = document.getElementById('hacking-status');

    // 4. Game Functions
    window.selectMission = (id) => {
        currentMission = missions[id];
        missionStep = 0;
        boredomLevel = 0;

        // Build a loadout that is ALWAYS solvable: every item the mission's
        // steps require must be present, then fill the rest at random.
        const required = currentMission.steps
            .filter(s => s.validItem)
            .map(s => s.validItem);
        const requiredItems = itemPool.filter(i => required.includes(i.id));
        const filler = itemPool
            .filter(i => !required.includes(i.id))
            .sort(() => Math.random() - 0.5);
        inventory = [...requiredItems, ...filler]
            .slice(0, Math.max(4, requiredItems.length))
            .sort(() => Math.random() - 0.5);

        hub.classList.add('hidden');
        gameplay.classList.remove('hidden');
        
        log(`OP: ${currentMission.name} INITIALIZED.`);
        log(`TARGET: ${id.toUpperCase()}.`);
        updateStep();
    };

    function updateStep() {
        const step = currentMission.steps[missionStep];
        systemMsg.textContent = `[MISSION_STATUS]: ${step.msg}`;
        sceneVisual.innerHTML = step.visual;
        
        boredomLevel = (missionStep / currentMission.steps.length) * 100;
        boredomBar.style.width = `${boredomLevel}%`;

        // Render interaction point
        interactionLayer.innerHTML = `
            <div id="target-zone" class="absolute inset-0 flex items-center justify-center">
                <div class="interactive-object w-48 h-48 border-2 border-dashed border-tactical/30 rounded-full flex items-center justify-center bg-tactical/5" 
                     ondrop="drop(event)" ondragover="allowDrop(event)" onclick="handleZoneClick()">
                    <span class="text-[8px] font-mono text-tactical uppercase tracking-widest opacity-40">TARGET_NODE</span>
                </div>
            </div>
        `;

        renderInventory();
    }

    function renderInventory() {
        inventoryGrid.innerHTML = inventory.map(item => `
            <div id="${item.id}" draggable="true" ondragstart="drag(event)" 
                 class="aspect-square bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-2xl cursor-grab active:cursor-grabbing hover:border-tactical transition-colors group relative">
                ${item.icon}
                <div class="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 p-2 bg-slate-950 border border-slate-800 rounded text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    <p class="text-tactical">${item.name}</p>
                    <p class="text-slate-500">${item.desc}</p>
                </div>
            </div>
        `).join('');
    }

    window.handleZoneClick = () => {
        const step = currentMission.steps[missionStep];
        if (step.isHacking && !isHacking) {
            startHacking();
        }
    };

    window.allowDrop = (ev) => ev.preventDefault();
    window.drag = (ev) => ev.dataTransfer.setData("text", ev.target.id);

    window.drop = (ev) => {
        ev.preventDefault();
        const itemId = ev.dataTransfer.getData("text");
        const step = currentMission.steps[missionStep];

        if (step.isHacking) {
            log("ERROR: Electronic bypass required. Drop-interaction disabled.");
            return;
        }

        if (itemId === step.validItem) {
            handleSuccess(step);
        } else {
            handleFailure(itemId);
        }
    };

    function handleSuccess(step) {
        log(`SUCCESS: ${step.successMsg}`);
        
        missionStep++;
        if (missionStep >= currentMission.steps.length) {
            setTimeout(completeMission, 1000);
        } else {
            const container = document.getElementById('scene-container');
            container.classList.add('bg-tactical/20');
            setTimeout(() => {
                container.classList.remove('bg-tactical/20');
                updateStep();
            }, 300);
        }
    }

    function handleFailure(itemId) {
        const msg = failMessages[itemId] || "Physics/Logic mismatch detected.";
        log(`ERROR: ${msg}`);
        
        const container = document.getElementById('scene-container');
        container.classList.add('bg-alert/20');
        setTimeout(() => container.classList.remove('bg-alert/20'), 300);
    }

    // 5. Hacking Mini-game
    function startHacking() {
        isHacking = true;
        hackTerminal.classList.remove('hidden');
        hackTerminal.classList.add('flex');
        hackStatus.textContent = "Status: Monitoring Signal...";
        
        hackPattern = Array.from({length: 4}, () => Math.floor(Math.random() * 9));
        userPattern = [];
        
        renderHackGrid();
        setTimeout(playHackPattern, 1000);
    }

    function renderHackGrid() {
        hackGrid.innerHTML = Array.from({length: 9}, (_, i) => `
            <button onclick="handleHackInput(${i})" class="aspect-square bg-slate-800 border border-slate-700 rounded-lg transition-all hover:bg-tactical/20" data-index="${i}">
                <span class="text-[10px] font-mono text-slate-600">${i + 1}</span>
            </button>
        `).join('');
    }

    async function playHackPattern() {
        hackStatus.textContent = "Status: Transmitting Sequence...";
        const buttons = hackGrid.querySelectorAll('button');
        
        for (const idx of hackPattern) {
            buttons[idx].classList.add('bg-tactical', 'scale-95');
            await new Promise(r => setTimeout(r, 600));
            buttons[idx].classList.remove('bg-tactical', 'scale-95');
            await new Promise(r => setTimeout(r, 200));
        }
        
        hackStatus.textContent = "Status: Waiting for User Input...";
    }

    window.handleHackInput = (idx) => {
        if (hackStatus.textContent.includes('Transmitting')) return;
        
        userPattern.push(idx);
        const buttons = hackGrid.querySelectorAll('button');
        buttons[idx].classList.add('bg-tactical/50');
        setTimeout(() => buttons[idx].classList.remove('bg-tactical/50'), 200);

        if (userPattern[userPattern.length - 1] !== hackPattern[userPattern.length - 1]) {
            hackStatus.textContent = "Status: SYNC_FAILURE. Retrying...";
            userPattern = [];
            setTimeout(playHackPattern, 1000);
            return;
        }

        if (userPattern.length === hackPattern.length) {
            hackStatus.textContent = "Status: SYNC_COMPLETE.";
            setTimeout(() => {
                hackTerminal.classList.add('hidden');
                hackTerminal.classList.remove('flex');
                isHacking = false;
                handleSuccess(currentMission.steps[missionStep]);
            }, 800);
        }
    };

    function completeMission() {
        boredomBar.style.width = `100%`;
        gameplay.classList.add('hidden');
        success.classList.remove('hidden');
    }

    function log(msg) {
        const entry = document.createElement('div');
        entry.textContent = `> ${msg}`;
        commsLog.appendChild(entry);
        commsLog.scrollTop = commsLog.scrollHeight;
    }
});
