let redLight = document.querySelector(".red");
let yellowLight = document.querySelector(".yellow");
let greenLight = document.querySelector(".green");
let applyTimeoutsBtn = document.querySelector(".apply-timeouts");
let colorLabel = document.querySelector(".color-label");
let upArrow = document.querySelector(".up");
let downArrow = document.querySelector(".down");

let lightsQueue = [greenLight, yellowLight, redLight];
const lightsTimesOut = { "red": 5000, "yellow": 4000, "green": 7000 };

let timeOutId;

function stopAllLights() {
    clearTimeout(timeOutId);
    redLight.style.backgroundColor = "grey";
    yellowLight.style.backgroundColor = "grey";
    greenLight.style.backgroundColor = "grey";
}

function runServices() {
    let currentLight = lightsQueue[0];
    if (currentLight === greenLight) {
        greenLightService();
    } else if (currentLight === redLight) {
        redLightService();
    } else {
        afterRedLightYellowService();
    }
}

function greenLightService() {
    stopAllLights();
    greenLight.style.backgroundColor = "green";
    colorLabel.innerHTML = "Move";

    timeOutId = setTimeout(() => {
        greenLight.style.backgroundColor = "grey";
        afterGreenLightYellowService();
    }, lightsTimesOut["green"]);
}

// Yellow Light Blinking after Green
function afterGreenLightYellowService() {
    clearTimeout(timeOutId);
    colorLabel.innerHTML = "Break";

    let blinks = lightsTimesOut["yellow"] / 1000;
    let count = 0;

    let blinkInterval = setInterval(() => {
        yellowLight.style.backgroundColor = yellowLight.style.backgroundColor === "yellow" ? "grey" : "yellow";
        count++;

        if (count >= blinks * 2) {
            clearInterval(blinkInterval);
            yellowLight.style.backgroundColor = "grey";
            redLightService();
        }
    }, 500);
}

function redLightService() {
    stopAllLights();
    redLight.style.backgroundColor = "red";
    colorLabel.innerHTML = "Stop";

    timeOutId = setTimeout(() => {
        redLight.style.backgroundColor = "grey";
        afterRedLightYellowService();
    }, lightsTimesOut["red"]);
}

function afterRedLightYellowService() {
    stopAllLights();
    yellowLight.style.backgroundColor = "yellow";
    colorLabel.innerHTML = "Be Ready";

    timeOutId = setTimeout(() => {
        yellowLight.style.backgroundColor = "grey";
        greenLightService();
    }, lightsTimesOut["yellow"]);
}

applyTimeoutsBtn.addEventListener("click", function () {
    stopAllLights();
    let newParams = prompt("Input time (in seconds) for green, yellow, and red (separated by space):");

    if (!newParams) return; // Cancel button pressed

    let times = newParams.split(" ").map(Number);
    if (times.length !== 3 || times.some(isNaN)) {
        alert("Please enter valid numeric values!");
        greenLightService();
        return;
    }

    lightsTimesOut["green"] = times[0] * 1000;
    lightsTimesOut["yellow"] = times[1] * 1000;
    lightsTimesOut["red"] = times[2] * 1000;
    greenLightService();
});

downArrow.addEventListener("click", function () {
    stopAllLights();
    let currentLight = lightsQueue.pop();
    lightsQueue.unshift(currentLight);
    runServices();
});

upArrow.addEventListener("click", function () {
    stopAllLights();
    let currentLight = lightsQueue.shift();
    lightsQueue.push(currentLight);
    runServices();
});

runServices();
