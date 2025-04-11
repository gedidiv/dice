let rolling = document.getElementById("rolling");
let hold = document.getElementById("hold");
let newgame = document.getElementById("newgame");
let player1 = document.getElementById("player-1");
let player2 = document.getElementById("player-2");
let player1score = document.getElementById("player-1-score");
let player2score = document.getElementById("player-2-score");
let player1total = document.getElementById("player-1-total");
let player2total = document.getElementById("player-2-total");
let img = document.getElementById("img");

let scores = [0, 0];
let current = [0, 0];
let active = 0;

function switchPlayer() {
  // Reset current score for the active player
  current[active] = 0;
  document.getElementById(`player-${active + 1}-score`).textContent = current[active];

  // Toggle active class between players
  document.getElementById(`player-${active + 1}`).classList.remove("active");
  active = active === 0 ? 1 : 0;
  document.getElementById(`player-${active + 1}`).classList.add("active");
}

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  img.src = `./img/dice-${roll}.png`;

  if (roll !== 1) {
    current[active] += roll;
    document.getElementById(`player-${active + 1}-score`).textContent = current[active];
  } else {
    switchPlayer();
  }
}

function holdScore() {
  scores[active] += current[active];
  document.getElementById(`player-${active + 1}-total`).textContent = scores[active];

  if (scores[active] >= 50) {
    alert(`Player ${active + 1} wins the game! 🎉`);
    resetGame();
  } else {
    switchPlayer();
  }
}

function resetGame() {
  scores = [0, 0];
  current = [0, 0];
  active = 0;

  player1score.textContent = 0;
  player2score.textContent = 0;
  player1total.textContent = 0;
  player2total.textContent = 0;
  img.src = "./img/dice-1.png";

  // Reset active player highlight
  player1.classList.add("active");
  player2.classList.remove("active");
}

// Initialize the game with Player 1 as active
player1.classList.add("active");