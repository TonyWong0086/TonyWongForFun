/* script.js */

document.addEventListener("DOMContentLoaded", () => {
    
    const form = document.getElementById("goose-form");
    const fitnessSlider = document.getElementById("fitness");
    const fitnessVal = document.getElementById("fitness-val");
    
    const formSection = document.querySelector(".combat-form-wrapper");
    const reportSection = document.getElementById("battle-report");
    const narrativeLog = document.getElementById("narrative-log");
    const gooseCount = document.getElementById("goose-count");
    const resetBtn = document.getElementById("reset-btn");
    const shareBtn = document.getElementById("share-btn");
    const combatRank = document.getElementById("combat-rank");

    let lastResult = 0;

    // Title earned based on geese felled
    function rankFor(n) {
        if (n <= 0) return "Immediate Casualty";
        if (n < 5) return "Brief Inconvenience";
        if (n < 12) return "Worthy Adversary";
        if (n < 20) return "Flock Scourge";
        if (n < 30) return "Honkslayer";
        return "Legend of the Pond";
    }

    // Sync Slider Value, fill gradient, and step markers
    function updateSlider() {
        const val = parseInt(fitnessSlider.value);
        const min = parseInt(fitnessSlider.min);
        const max = parseInt(fitnessSlider.max);
        const pct = ((val - min) / (max - min)) * 100;

        fitnessVal.textContent = val;
        fitnessSlider.style.setProperty('--fill', pct + '%');

        // Highlight step markers
        const steps = document.querySelectorAll('.slider-steps span');
        steps.forEach((step, i) => {
            if (i + 1 <= val) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    fitnessSlider.addEventListener("input", updateSlider);
    updateSlider(); // Initialize on load

    // Form Submission Logic
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // 1. Gather Inputs
        const height = parseFloat(document.getElementById("height").value);
        const weight = parseFloat(document.getElementById("weight").value);
        const fitnessNum = parseInt(fitnessSlider.value);
        const skill = document.getElementById("skill").value;
        const weapon = document.querySelector('input[name="weapon"]:checked').value;

        // 2. The Absurd Math
        // Base calculation based on dimensions turning height/weight into raw power
        let baseGeese = Math.floor((height / 12) + (weight / 8)); 

        // Fitness Multiplier (level 5 is an average 1.0 multiplier)
        let fitnessMultiplier = 0.5 + (fitnessNum * 0.1); 
        
        let initialTally = Math.floor(baseGeese * fitnessMultiplier);
        
        let modifierLog = "";
        let modifierAmount = 0;

        // Special Skill Modifiers
        switch(skill) {
            case "long_arms":
                modifierAmount += 5;
                modifierLog += "Your unusually long arms gave you a significant reach advantage, allowing you to stiff-arm several initial attackers. ";
                break;
            case "pain_tolerance":
                modifierAmount += 7;
                modifierLog += "You absorbed terrifying beak strikes without flinching, confusing the flock long enough to take down a few extra. ";
                break;
            case "irrational_confidence":
                modifierAmount += 12;
                modifierLog += "Your utter lack of respect for the sheer power of nature allowed you to charge headfirst into the flock. You died quickly, but gloriously. ";
                break;
            case "screaming":
                modifierAmount -= 2;
                modifierLog += "Screaming didn't terrify them. It only enraged them further, calling reinforcements. ";
                break;
        }

        // Weapon Modifiers
        let weaponLog = "";
        switch(weapon) {
            case "umbrella":
                modifierAmount += 6;
                weaponLog = "Your sturdy umbrella acted as a phenomenal shield, repelling aerial dive-bombs until it ultimately folded inside out under the sheer pressure of honks.";
                break;
            case "water_bottle":
                modifierAmount += 4;
                weaponLog = "Swinging the half-empty water bottle proved effective for blunt force trauma, though you eventually threw your shoulder out.";
                break;
            case "towel":
                modifierAmount += 3;
                weaponLog = "The wet towel generated incredible cracking sounds, disorienting the vanguard before they flanked you from the sides.";
                break;
            case "keyboard":
                modifierAmount += 8;
                weaponLog = "Typing 'GG' into your gaming keyboard while swinging it around wildly inflicted devastating RGB moral damage. Keycaps flew everywhere, taking out an entire squad.";
                break;
        }

        // Final Calculation
        let finalGeese = initialTally + modifierAmount;
        if (finalGeese < 0) finalGeese = 0; // Can't beat negative geese

        // 3. Build Narrative
        const finalNarrative = `
            ${modifierLog}
            ${weaponLog}
            <br><br>
            Ultimately, your human stamina gave out. The sheer volume of feathers and unbridled fury was too much. You collapsed under a mountain of hissing combatants. 
            <br>Valhalla awaits.
        `;

        // 4. Update UI
        narrativeLog.innerHTML = finalNarrative;
        
        // Hide form, show results
        formSection.classList.add("hidden");
        reportSection.classList.remove("hidden");

        // Animate the number counting up
        lastResult = finalGeese;
        animateValue(gooseCount, 0, finalGeese, 1500);
        combatRank.textContent = rankFor(finalGeese);

        // Scroll to results
        reportSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Share / copy result
    shareBtn.addEventListener("click", () => {
        const text = `I fought off ${lastResult} angry geese before falling. Rank: ${rankFor(lastResult)}. ` +
                     `How many can you take? — Goose Combat Simulator`;
        if (window.FX) FX.copy(text);
    });

    // Reset Logic
    resetBtn.addEventListener("click", () => {
        reportSection.classList.add("hidden");
        formSection.classList.remove("hidden");

        // Scroll back to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Number Animation Helper
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
