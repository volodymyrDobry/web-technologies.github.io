let bulbBtn = document.querySelector(".bulb__btn");
let bulbBrightness = document.querySelector(".bulbs-container__brightness-control");
let bulb = document.querySelector(".bulb__light");
let bulbTypeSelector = document.getElementById("bulbType");
let timeOut;
let currentBulbType = "incandescent";

function turnOnTheBulb() {
    bulbBtn.innerHTML = "OFF";
    bulb.classList.remove("is-off");

    switch (currentBulbType) {
        case "incandescent":
            bulb.classList.add("is-on-incandescent");
            break;
        case "energy-saving":
            bulb.classList.add("is-on-energy-saving");
            break;
        case "led":
            bulb.classList.add("is-on-led");
            break;
    }

    resetTimeout();
}

function turnOffTheBulb() {
    bulb.classList.remove("is-on-incandescent", "is-on-energy-saving", "is-on-led");
    bulb.classList.add("is-off");
    bulbBtn.innerHTML = "ON";
    bulb.style.backgroundColor = "white";
    bulb.style.boxShadow = "none";
}

function resetTimeout() {
    clearTimeout(timeOut);
    timeOut = setTimeout(turnOffTheBulb, 5000);
}

bulbBtn.addEventListener("click", function () {
    if (bulb.classList.contains("is-on-incandescent") || bulb.classList.contains("is-on-energy-saving") || bulb.classList.contains("is-on-led")) {
        clearTimeout(timeOut);
        turnOffTheBulb();
        return;
    }

    turnOnTheBulb();
    updateBulbBrightness();
});

bulbBrightness.addEventListener("input", function () {
    if (!bulb.classList.contains("is-on-incandescent") && !bulb.classList.contains("is-on-energy-saving") && !bulb.classList.contains("is-on-led")) {
        return;
    }

    updateBulbBrightness();
    resetTimeout();
});

bulbTypeSelector.addEventListener("change", function () {
    currentBulbType = this.value;
    turnOffTheBulb();
});

function updateBulbBrightness() {
    let brightness = bulbBrightness.value;
    let glowSize = brightness * 0.8;

    let glowColor;
    switch (currentBulbType) {
        case "incandescent":
            glowColor = "rgba(255, 255, 0, 0.6)";
            break;
        case "energy-saving":
            glowColor = "rgba(0, 255, 0, 0.6)";
            break;
        case "led":
            glowColor = "rgba(0, 255, 255, 0.6)";
            break;
    }

    bulb.style.boxShadow = `
        0 0 ${glowSize * 0.5}px ${glowColor},
        0 0 ${glowSize * 0.8}px ${glowColor},
        0 0 ${glowSize * 1.2}px ${glowColor},
        0 0 ${glowSize * 1.5}px ${glowColor}`;
}
