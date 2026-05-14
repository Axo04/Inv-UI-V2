console.log("script loaded :3");

const icons = {
  "Axe": "axe.png",
  "Flame Sword": "flame.png",
  "Staff of Terror": "staff.png",
  "Cursed Axe": "cursedaxe.png",
  "Daggers": "dagger.png",
  "Winter\'s Touch": "winterstouch.png",
  "Electric Hammer V2": "elechammerv2.png",
};
let ap = 0;
let mp = 0;

let baseDamage = 0;
let iconEl = document.getElementById("itemIcon");

function showItem(name, damage, rarity, power) {

    baseDamage = damage;

  

iconEl.src = icons[name] || "icons/default.png";

// [[ show weapon data ]] \\

    let nameEl = document.getElementById("name");
    let dmgEl = document.getElementById("damage");
    let rarityEl = document.getElementById("rarity");

    nameEl.textContent = name;
    dmgEl.textContent = damage;
    rarityEl.textContent = rarity;
    document.getElementById("max power lvl").textContent = power;
    // damage glow (based on value)
if (parseInt(dmgEl.textContent) < 15) {
    dmgEl.style.color = "#aaaaaa";
    dmgEl.style.textShadow = "0 0 4px #888";
}
else if (parseInt(dmgEl.textContent) < 30) {
    dmgEl.style.color = "#3aa0ff";
    dmgEl.style.textShadow = "0 0 6px #3aa0ff";
}
else if (parseInt(dmgEl.textContent) < 50) {
    dmgEl.style.color = "#a335ee";
    dmgEl.style.textShadow = "0 0 8px #a335ee";
}
else {
    dmgEl.style.color = "#ff9a00";
    dmgEl.style.textShadow = "0 0 10px #ff9a00";
}

let powerEl = document.getElementById("max power lvl");

powerEl.style.color = "#00ff88";
powerEl.style.textShadow = "0 0 8px #00A303";
    let r = rarity.toLowerCase();

    // reset
    nameEl.style.color = "white";
    nameEl.style.textShadow = "none";
    rarityEl.style.color = "white";
    rarityEl.style.textShadow = "none";

    // rarity glow

   const rarityColors = {
    common: "#aaaaaa",
    rare: "#3aa0ff",
    epic: "#a335ee",
     electric: "#00ffff",
    unique: "#ff9a00",
    magma: "#ff6600",
    terror: "#9900D1",
    dark: "#4B2D63",
    mythical: "#3A339E",
    divine: "#C9C624",
    void: "#FF00E2",
    "void+": "#FF2E8F",
    none: "#7B2828"
};



let color = rarityColors[r] || "white";
iconEl.style.filter = `drop-shadow(0 0 10px ${color})`;




rarityEl.style.color = color;
rarityEl.style.textShadow = "0 0 10px " + color;

    // apply glow to name
    nameEl.style.color = rarityEl.style.color;
    nameEl.style.textShadow = rarityEl.style.textShadow;
}
function flashInfoPanel(color){
    const flash = document.querySelector(".enchant-flash");
    if (!flash) return;

    flash.style.background = `
linear-gradient(
    90deg,
    transparent 0%,
    transparent 35%,
    ${color}22 42%,
    ${color}aa 50%,
    ${color}22 58%,
    transparent 65%,
    transparent 100%
)`;
    flash.classList.remove("active");
    void flash.offsetWidth;
    flash.classList.add("active");
}
//! Enchant !//

function applyEnchant() {

    let select = document.getElementById("enchantSelect");
    let enchantName = document.getElementById("enchantName");
    let title = document.getElementById("enchantTitle");
    let desc = document.getElementById("enchantDesc");
    let icon = document.getElementById("enchantIcon");

    let value = parseInt(select.value);
    let text = select.options[select.selectedIndex].text;

    // ✅ DO NOT BLOCK value 0 (Loot+)
    if (value === null || value === undefined) return;

    // ✅ ONLY apply damage if value > 0
    if (value > 0) {
        document.getElementById("damage").textContent = baseDamage + value;
    }

    

    // ✅ KEEP YOUR +1 SYSTEM
    enchantName.textContent = "+" + value;

    // reset
    title.textContent = "NA";
    desc.textContent = "No enchant selected. Select a enchant to see what it does.";
    icon.src = "na.png";
    enchantName.style.color = "#B900D1";

  

    // enchant logic

    if (text.includes("Select Enchant")) {
        title.textContent = "NA";
        desc.textContent = "No enchant.";
        icon.src = "na.png";
        enchantName.style.color = "#7B2828";
    }
    if (text.includes("Frost")) {
        title.textContent = "Frost";
        desc.textContent = "Slows enemies";
        icon.src = "frost.png";
        enchantName.style.color = "#3aa0ff";
    }
    else if (text.includes("Fire")) {
        title.textContent = "Fire";
        desc.textContent = "Burns enemies";
        icon.src = "fire.png";
        enchantName.style.color = "#ff6600";
    }
    else if (text.includes("Shock")) {
        title.textContent = "Shock";
        desc.textContent = "Chains lightning";
        icon.src = "shock.png";
        enchantName.style.color = "#ffff00";
    }
    else if (text.includes("Loot+")) {
        title.textContent = "Loot+";
        desc.textContent = "+25% emeralds, +15% food";
        icon.src = "lootupg.png";
        enchantName.style.color = "#8AFF9D";
    }
    else if (text.includes("+1")) {
        title.textContent = "+1 Boost";
        desc.textContent = "Minor power increase";
        icon.src = "plusone.png";
        enchantName.style.color = "#00D1C0";
    }

    else if (text.includes("Exploding")) {
        title.textContent = "Exploding";
        desc.textContent = "Explodes ememys on death.";
        icon.src = "exploding.png";
        enchantName.style.color = "#d10069";
    }

    // glow
    enchantName.style.textShadow = "0 0 6px " + enchantName.style.color;
    desc.style.color = enchantName.style.color;
    desc.style.textShadow = "0 0 6px " + enchantName.style.color;
    flashInfoPanel(enchantName.style.color);
}

    
window.showItem = showItem;
window.applyEnchant = applyEnchant;

document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", function () {
        document.querySelectorAll(".item").forEach(i => {
            i.classList.remove("selected");
            i.style.borderColor = "";
            i.style.boxShadow = "";
        });

        this.classList.add("selected");

        // force correct rarity color after click
        requestAnimationFrame(() => {
            let rarity = document.getElementById("rarity").textContent.toLowerCase();

            const rarityColors = {
                common: "#aaaaaa",
                rare: "#3aa0ff",
                epic: "#a335ee",
                electric: "#00ffff",
                unique: "#ff9a00",
                magma: "#ff6600",
                terror: "#9900D1",
                dark: "#4B2D63",
                mythical: "#3A339E",
                divine: "#C9C624",
                void: "#FF00E2",
                "void+": "#FF2E8F",
                none: "#7B2828"
            };

            let color = rarityColors[rarity] || "white";

            this.style.borderColor = color;
            this.style.boxShadow = `0 0 12px ${color}`;
        });
    });
});


