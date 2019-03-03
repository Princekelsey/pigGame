/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer,
    diceDisplay, rollDice, currentScore,
    player1Panel, player2Panel,gameActive,
    player1Score,player2Score,holdBtn, newGame;

startGame();

// Adding event listener to the roll dice key
rollDice.addEventListener('click', function () {
    if (gameActive) {
        // first set random number
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        // Display the result to reflect the dice value
        for (let i = 0; i < diceDisplay.length; i++) {
            diceDisplay[i].style.display = 'block';
        }
        document.querySelector('#dice-1' ).src = 'dice-' + dice1 + '.png';
        document.querySelector('#dice-2' ).src = 'dice-' + dice2 + '.png';

        // update the roundScore and display it on the Current Score
        if (dice1 > 1 && dice2 > 1){
            roundScore += dice1 + dice2;
            currentScore = document.querySelector('#current-' + activePlayer);
            currentScore.textContent = roundScore;
        }else{
            player2();
        }
    }

});

// adding eventlistner to the hold button
holdBtn.addEventListener('click', function () {
    if (gameActive){
        // add score to the global score
        scores[activePlayer] += roundScore;
        // display the score on the global score board
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        let selection = document.querySelector('.winning-score').value;
        let winningScore;
        if (selection) {
            winningScore = selection
        }else {
            winningScore = 100;
        }
        if (scores[activePlayer] >= winningScore){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!!';
            displayNone();
            document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
            gameActive = false;
        } else {
            player2();
        }
    }

});

// event listener to the new game button
newGame.addEventListener('click', startGame);



// player two function
function player2() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    player1Score.textContent = '0';
    player2Score.textContent = '0';

    player1Panel.classList.toggle('active');
    player2Panel.classList.toggle('active');

   display();
}

// setting display to none
function displayNone() {
    for (let i = 0; i <diceDisplay.length ; i++) {
        diceDisplay[i].style.display = 'none';
    }
}

// function that controls all the actions on starting the game
function startGame() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gameActive = true;
    diceDisplay  = document.querySelectorAll('.dice');
    player1Panel = document.querySelector('.player-0-panel');
    player2Panel = document.querySelector('.player-1-panel');
    player1Score = document.getElementById('current-0');
    player2Score = document.getElementById('current-1');
    rollDice = document.querySelector('.btn-roll');
    holdBtn = document.querySelector('.btn-hold');
    newGame = document.querySelector('.btn-new');
// setting the dice display to none before starting to play game
    displayNone();

// setting all the scores to 0(zero) at first game load before playing
    document.getElementById('score-1').textContent = '0';
    player1Score.textContent = '0';
    document.getElementById('score-0').textContent = '0';
    player2Score.textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    player1Panel.classList.add('active');
    player2Panel.classList.remove('active');
    player1Panel.classList.remove('winner');
    player2Panel.classList.remove('winner');
}
