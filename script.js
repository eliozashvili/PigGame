'use strict';

// Selecting elements
const playerEl_0 = document.querySelector(`.player--0`);
const playerEl_1 = document.querySelector(`.player--1`);
const scoreEl_0 = document.getElementById(`score--0`);
const scoreEl_1 = document.getElementById(`score--1`);
const currentEl_0 = document.querySelector(`#current--0`);
const currentEl_1 = document.querySelector(`#current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let scores, activePlayer, currentScore, playing;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  // Start conditions
  scoreEl_0.textContent = 0;
  scoreEl_1.textContent = 0;
  diceEl.classList.add(`hidden`);

  currentEl_0.textContent = 0;
  currentEl_1.textContent = 0;

  playerEl_0.classList.remove(`player--winner`);
  playerEl_1.classList.remove(`player--winner`);
  playerEl_0.classList.add(`player--active`);
  playerEl_1.classList.remove(`player--active`);
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl_0.classList.toggle(`player--active`); // Color of active player
  playerEl_1.classList.toggle(`player--active`);
};

// Implement roll
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`; // .src to show images

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// Implement hold
btnHold.addEventListener(`click`, function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      // Finish of the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      diceEl.classList.add(`hidden`);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, init);
