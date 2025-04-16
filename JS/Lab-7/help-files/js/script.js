'use strict';

// variables and elements
//Audio
const introSound = new Audio('sfx/intro.m4a');
const waitSound = new Audio('sfx/wait.m4a');
const fireSound = new Audio('sfx/fire.m4a');
const shotSound = new Audio('sfx/shot.m4a');
const winSound = new Audio('sfx/win.m4a');
const deathSound = new Audio('sfx/death.m4a');
//Buttons
let btnRestart = document.querySelector(".button-restart");
let btnNextLevel = document.querySelector(".button-next-level");
let startGameBtn = document.querySelector(".button-start-game");
//Blocks
let gameMenuSection = document.querySelector(".game-menu");
let mainWindow = document.querySelector(".wrapper");
let gamePanels = document.querySelector(".game-panels");
let gameScreen = document.querySelector(".game-screen");
let gunman = document.querySelector(".gunman");
let score = document.querySelector(".score-panel__score_num");
let message = document.querySelector(".message");
let levelHolder = document.querySelector(".score-panel__level");
//Time panels
let timePanelGunman = document.querySelector(".time-panel__gunman");
let timePanelYou = document.querySelector(".time-panel__you");

//Win
let winScreen = document.querySelector(".win-screen");
//Game Variables
let isKilled = false;
let level = 1;
let shootingTime = 1000;
let timeObserver;
let seconds = 0;
let tens = 0;
let scoresCount = 0;


startGameBtn.addEventListener('click',function(){
    mainWindow.style.display = "block";
    gamePanels.style.display = "block";
    gameScreen.style.display = "block";
    gameMenuSection.style.display = "none";
    startGame();
});
btnNextLevel.addEventListener('click',nextLevel);
btnRestart.addEventListener('click',restartGame);

function resetGameVars(){
    seconds = 0;
    tens = 0;
    isKilled = false;
    levelHolder.innerHTML = `Level ${level}`;
    timePanelYou.innerHTML = "0.00";
    timePanelGunman.innerHTML = (shootingTime / 1000).toFixed(2);
    gunman.className = 'gunman';
}

function startGame() {
    resetMessage();
    message.style.display = "none";
    resetGameVars();

    gunman.classList.add("gunman-level-" + level);

    gunman.addEventListener('transitionend',prepareForDuel);

    setTimeout(moveGunman,300);
}

function restartGame() {
    btnRestart.style.display = "none";
    deathSound.pause();
    startGame();
}

function nextLevel() {
    btnNextLevel.style.display = "none";
    winSound.pause();
    ++level;
    shootingTime -= 100;
    startGame();
}

function moveGunman() {
    introSound.play();
    gunman.classList.add("moving");
}

function duel(){
    resetMessage();
    showFireMessage();
    fireSound.play();
    gunman.classList.add(`gunman-level-${level}__ready`);
    setTimeout(gunmanShootsPlayer,shootingTime);
    timeObserver = setInterval(timeCounter, 10);
    gunman.addEventListener("mousedown",playerShootsGunman);
}

function prepareForDuel() {
    waitSound.play();
    gunman.classList.remove("moving");
    gunman.classList.add("standing");
    gunman.classList.add(`gunman-level-${level}__standing`);
    setTimeout(duel, 1000);
}

function timeCounter() {
    tens++;
    let tensStr = tens <= 9 ? "0" + tens : tens;
    let secStr = seconds;

    if (tens > 99) {
        seconds++;
        secStr = seconds;
        tens = 0;
        tensStr = "00";
    }

    timePanelYou.innerHTML = secStr + "." + tensStr;
}

function gunmanShootsPlayer() {
    if (!isKilled){
        clearInterval(timeObserver);
        resetMessage();
        setLostMessage();
        shotSound.play();
        isKilled = true;
        gunman.classList.add(`gunman-level-${level}__shooting`);
        deathSound.play();
        deathSound.loop = true;
        btnRestart.style.display = "block";
        setTimeout(function (){
            gunman.classList.remove(`gunman-level-${level}__shooting`);
            gunman.classList.remove(`gunman-level-${level}__ready`);
        },200);
        gunman.removeEventListener("mousedown",playerShootsGunman);
    }
}

function playerShootsGunman() {
    if (!isKilled){
        clearInterval(timeObserver);
        resetMessage();
        setWinMessage();

        isKilled = true;

        shotSound.play();
        gunman.classList.add("gunman-level-" + level + "__death");
        clearInterval(timeObserver);
        winSound.play();
        scoreCount();

        if (level >= 5){
            showWinScreen();
        }else{
            btnNextLevel.style.display = "block";
        }
        gunman.removeEventListener("mousedown",playerShootsGunman);
    }
}

function scoreCount() {
    let counter = scoresCount;
    scoresCount = level * 100;
    let scoreCountInterval = setInterval(function (){
         counter += 50;
         score.innerHTML = counter;
         if (counter === scoresCount){
             clearInterval(scoreCountInterval);
         }
    },1000);
}

function resetMessage(){
    message.className = "message";
}

function setLostMessage(){
    message.style.display = "block";
    message.classList.add("message--dead");
    message.innerHTML = "You dead!";
}

function setWinMessage(){
    message.style.display = "block";
    message.classList.add("message--win");
    message.innerHTML = "You Won!";
}

function showWinScreen(){
    gameScreen.style.display = "none";
    mainWindow.style.display = "none";
    gamePanels.style.display = "none";
    //let winScreenScore = document.querySelector(".scores");
    winScreen.style.display = "block";
    //winScreenScore.innerHTML = scoresCount;
}

function showFireMessage(){
    message.style.display = "block";
    message.classList.add("message--fire");
}