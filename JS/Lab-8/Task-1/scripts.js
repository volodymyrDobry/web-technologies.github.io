const gameContainer = document.querySelector(".game-container");
const cardsContainer = document.querySelector(".cards");
const introContainer = document.querySelector(".intro");
const resultContainer = document.querySelector(".result");
const playerInputsDiv = document.getElementById("playerInputs");
const playerModeSelect = document.getElementById("playerMode");
const restartBtn = document.querySelector(".restart-btn");

let currentCard = null;
const markUp = {
    8: {
        rows:4,
        cols:4
    },
    10:{
        rows:4,
        cols:5
    },
    12:{
        rows:4,
        cols:6
    },
    15:{
        rows:5,
        cols:6
    }
};

cardsContainer.addEventListener("mousedown", (event) => {
    let innerCard = event.target.closest(".card-inner");
    if (innerCard!==null) {
        clickCardHandler(innerCard);
        setTimeout(() => {
            if (checkGameStatus()){
                endGameHandler();
                clearInterval(timerInterval);
            }
        },1000)
    }
})

playerModeSelect.addEventListener("change", showUsernameInputs);
restartBtn.addEventListener("click",restartGame);

function compareCards(currentCard, prevCard){
    const currentImg = currentCard.querySelector(".card-img");
    const targetImg = prevCard.querySelector(".card-img");
    return currentImg.src === targetImg.src;
}

function clickCardHandler(target) {
    if (target.classList.contains("flipped")) {
        return;
    }

    rotateCard(target);

    if (currentCard !== null) {
        const previousCard = currentCard;
        setTimeout(function () {
            if (!compareCards(target,previousCard)) {
                rotateCardsBack(target, previousCard);
                switchUser();
            }else{
                addPoints();
            }
            addAttempts();
        }, 400);
        currentCard = null;

    } else {
        currentCard = target;
    }
}

function rotateCardsBack(target, previousCard) {
    target.classList.remove("flipped");
    previousCard.classList.remove("flipped");
    previousCard.closest(".card-inner").style.transform = "rotateY(0deg)";
    target.closest(".card-inner").style.transform = "rotateY(0deg)";
}

function rotateCard(card){
    card.classList.add("flipped");
    card.style.transform = "rotateY(180deg)";
}

function Shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function generateCards(cardsQuantity){
    let fruits = [];
    for (let i = 0; i < cardsQuantity; i++) {
        const fruit = {
            img: `fruits/fruit_${i}.png`,
            alt: `fruit_${i}`
        };
        fruits.push(fruit, {...fruit});
    }
    return Shuffle(fruits);
}

function displayCards(fruits){
    cardsContainer.innerHTML = "";
    for (let fruit of fruits){
        const card = `<div class="card">
                <div class="card-inner">
                    <div class="card-back">
                        <img src=${fruit.img} alt=${fruit.alt} class="card-img"/>
                    </div>
                    <div class="card-front">
                        <img src="fruits/back.png" alt="back" class="default-card-img"/>
                    </div>
                </div>
            </div>`;
        cardsContainer.innerHTML += card;
    }
}

function createMatrix(cardsQuantity){
    let markUpParams = markUp[cardsQuantity];
    cardsContainer.style.gridTemplateColumns = `repeat(${markUpParams.cols},100px)`;
    cardsContainer.style.gridTemplateRows = `repeat(${markUpParams.rows},120px)`;
}

function renderGame(){
    introContainer.style.display = "none";
    gameContainer.style.display = "block";
    createMatrix(game.cardsQuantity);
    let fruits = generateCards(game.cardsQuantity);
    displayCards(fruits);
    displayUsers();
}

function checkGameStatus() {
    const cards = Array.from(cardsContainer.children);
    return cards
        .map(card => card.querySelector(".card-inner"))
        .every(inner => inner.classList.contains("flipped"));
}

function renderSinglePlayerModeScreen(block){
    block.innerHTML = "";
    const userResult = game.users[game.currentActiveUser];
    const singleUserResult = `
        <h3>Summary for <span class="result-username">${userResult.username}</span></h3>
        <p>Points: <span class="result-points">${userResult.points}</span></p>
        <p>Attempts: <span class="result-attempts">${userResult.attempts}</span></p>
        <p>Time Spent: <span class="result-time">${game.difficulty - userResult.timeLeft}</span> sec</p>
        `;
    const restartBtn = document.createElement("button");
    restartBtn.classList.add("btn");
    restartBtn.classList.add("restart-btn");
    restartBtn.addEventListener("click",restartGame);
    restartBtn.innerText = "Restart Game";
    block.innerHTML += singleUserResult;
    block.appendChild(restartBtn);
}

function showSinglePlayerModeEndScreen(){
    const resultBlock = document.querySelector(".result");
    const singleResultBlock = document.querySelector(".result-single");
    gameContainer.style.display = "none";
    resultBlock.style.display = "block";
    singleResultBlock.style.display = "block";
    renderSinglePlayerModeScreen(singleResultBlock);
}

function renderMultiPlayerModeScreen(block) {
    block.innerHTML = `<h3>Match Summary</h3>`;

    matchHistory.forEach(record => {
        const roundHTML = `
            <div class="round-summary">
                <h4>Round ${record.matchNumber}</h4>
                <p><strong>${users[0].username}</strong> - Points: ${record.user1.points}, Attempts: ${record.user1.attempts}</p>
                <p><strong>${users[1].username}</strong> - Points: ${record.user2.points}, Attempts: ${record.user2.attempts}</p>
            </div>
        `;
        block.innerHTML += roundHTML;
    });

    block.innerHTML += `<button class="btn restart-btn">Restart Game</button>`;
}

function showDoublePlayerModeEndScreen() {
    const resultBlock = document.querySelector(".result");
    const multiResultBlock = document.querySelector(".result-multiplayer");

    gameContainer.style.display = "none";
    resultBlock.style.display = "block";
    multiResultBlock.style.display = "block";

    renderMultiPlayerModeScreen(multiResultBlock);

}

function hideResultScreen() {
    resultContainer.style.display = "none";
}

function showUsernameInputs(){
    const mode = Number(playerModeSelect.value);
    playerInputsDiv.innerHTML = '';
    showFirstUsernameInput();

    if (mode === 2) {
        showSecondUsernameInput();
    }
}

function showSecondUsernameInput(){
    const input2 = document.createElement("input");
    input2.type = "text";
    input2.placeholder = "Player 2 Name";
    input2.id = "player2Name";
    input2.classList.add("intro-input");
    playerInputsDiv.appendChild(input2);

    const roundQuantity = `
            <label for="roundQuantity">Number of Rounds:</label>
            <select id="roundQuantity" class="intro-select">
                <option value="1" selected>1</option>
                <option value="3" >3</option>
                <option value="5">5</option>
            </select>`;

    playerInputsDiv.innerHTML += roundQuantity;
}

function showFirstUsernameInput(){
    const input1 = document.createElement("input");
    input1.type = "text";
    input1.placeholder = "Player 1 Name";
    input1.id = "player1Name";
    input1.classList.add("intro-input");
    playerInputsDiv.appendChild(input1);
}
