'use strict';
// Selecting elements 
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl =document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El= document.querySelector('.player--0');
const player1El= document.querySelector('.player--1');

let scores,currentScore, activePlayer , Playing;

const init = function(){
     Playing = true;// game state to disable buttons once the game is over
     currentScore = 0;
     activePlayer=0;
     scores=[0,0];

    score0El.textContent = 0;
    score1El.textContent = 0;
   
    current0El.textContent=0;
    current1El.textContent=0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    
};

init();


// function to switch player
const switchPlayer = function (){
    document.getElementById(`current--${activePlayer}`).textContent =  0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
     // toggle method will add the class if its not already present otherwise if the class is present it will remove it
    player0El.classList.toggle('player--active');// we start with player 0 and class will already be present hence it will be removed when we switch the active player 
    player1El.classList.toggle('player--active');// the player--active class will initially be not present in player 1 so when we switch the player it will be added
}

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// rolling dice functionality
btnRoll.addEventListener('click', function(){
if(Playing){
//1.Generating a random dice roll
const dice = Math.trunc(Math.random()*6)+1;
//2.Display dice

diceEl.classList.remove('hidden');
diceEl.src = `dice-${dice}.png`;//using s string literal to display the dice images according to the value of the dice 
//3.Check if it is a 1 and if true , switch to next player
if(dice !==1){
    //add dice to current score
    currentScore+=dice;
    document.getElementById(`current--${activePlayer}`).textContent= currentScore;// we are dynamically selecting the active player here

}
else{
    //switch to next player
   switchPlayer();
}
}
});

btnHold.addEventListener('click', function(){
    if(Playing){
    //1. add current score to active player's score
    scores[activePlayer]+= currentScore; // we intially declared scores as an array with the scores of player 1 and 2 according to the array index 0 and 1 respectively , we now use this array to get the overall score globally of each player and store it in the total score 
    //suppose activePlayer is second player(player-2) then => scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];// we get the class names of the total scores of each player dynamically and assign the total score to them
    //2. check if player's score is >= 100
    }
    if (scores[activePlayer]>=100){
        //finish the game
        Playing=false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');// enabling the player winner class once the game is over
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');//removing the active player class since we have a winner and the game is over
        diceEl.classList.add('hidden');
    }
    else{
  //3.switch to next player
  switchPlayer();
    }
  
});

btnNew.addEventListener('click', init);



