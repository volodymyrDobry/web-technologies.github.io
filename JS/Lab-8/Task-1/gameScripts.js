const startGameBtn = document.getElementById("startGameBtn");
const resetBtn = document.getElementById("resetGameBtn");

const game = {
    roundQuantity:1,
    currentRound:1,
    twoPlayersMode:false,
    cardsQuantity:6,
    difficulty:180,
    users:users,
    currentActiveUser:0
}

const matchHistory = [];
startGameBtn.addEventListener("click",setUpGameSettingsAndStartHandler);
resetBtn.addEventListener("click",resetSettings);

function setUpGameSettingsAndStartHandler(){
    const difficulty = document.getElementById("difficulty");
    const cardsQuantity = document.getElementById("cardQuantity");
    const playerMode = document.getElementById("playerMode");
    if (Number(playerMode.value) > 1){
        setUpDoublePlayerMode(Number(difficulty.value));
    }else{
        setUpSinglePlayerMode(Number(difficulty.value));
    }
    game.cardsQuantity = Number(cardsQuantity.value);
    game.difficulty = Number(difficulty.value);

    startGame();
}

function setUpDoublePlayerMode(time){
    const username2 = document.getElementById("player2Name").value;
    setUpSinglePlayerMode(time)
    game.twoPlayersMode = true;
    addUser(username2,time);
}

function setUpSinglePlayerMode(time){
    const username1 = document.getElementById("player1Name").value;
    addUser(username1,time);
}

function startGame(){
    renderGame();
    continueUserTimer(game.users[game.currentActiveUser]);
}

function expiredTimeHandler(){
    if (!game.twoPlayersMode){
        showSinglePlayerModeEndScreen();
    }
    if (users[0].timeLeft === 0 &&  users[1].timeLeft === 0){
        showDoublePlayerModeEndScreen();
    }else{
        switchUser();
    }
}

function endGameHandler(){
    if (!game.twoPlayersMode){
        showSinglePlayerModeEndScreen();
    }
    else{
       logUsersActions();
       if (game.currentRound < game.roundQuantity){
           game.currentRound++;
           nextRound();
       }else{
           showDoublePlayerModeEndScreen();
       }
    }
}

function logUsersActions(){
    const record = {
        matchNumber:game.currentRound,
        user1:{
            attempts:users[0].attempts,
            points:users[0].points
        },
        user2:{
            attempts:users[1].attempts,
            points:users[1].points
        }
    };
    matchHistory.push(record)
}

function nextRound(){
    restartGame();
}

function restartGame(){
    hideResultScreen();
    resetUsers();
    startGame();
}

function resetSettings(){
    document.getElementById("difficulty").selectedIndex = 0;
    document.getElementById("cardQuantity").selectedIndex = 0;
    document.getElementById("playerMode").selectedIndex = 0;
    showUsernameInputs();
}