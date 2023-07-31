// IMPORT THE NECESSAREY FUNCTIONS
import { start_AI_vs_human_game } from "./ai_vs_human.js";
import { start_human_vs_human_game } from "./human_vs_human.js";
import { start_AI_vs_AI_game } from "./ai_vs_ai.js";

// GLOBAL VARIABLES
export let gameOver = false;
export let currentPlayer = 1;
export const gridItems = document.querySelectorAll(".grid-item");

// SELECT GAME TYPE ELEMENTS
const playerOne = document.querySelector("#first-player");
const playerTwo = document.querySelector("#second-player");
const gameTypeInfo = document.querySelector("#player-information");
const form = document.getElementById("game-form");

// PREVENT FROM SUBMISSION
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // SELECT HAME TYPE
  const gameTypeSelect = document.getElementById("game-type-select");
  const selectedGameType = gameTypeSelect.value;

  // START THE CORRESPONDING GAME BASED ON THE SELECRTED GAME TYPE
  // human vs. human game
  if (selectedGameType === "human-human") {
    gameTypeInfo.innerText =
      "You are PLAYER 1, you will be playing against PLAYER 2.";
    playerOne.innerText = "You are Player 1, your symbol is X - good luck!";
    playerTwo.innerText = "Player 2 symbol is 0 - he is your rival, beat him!";
    start_human_vs_human_game();
    // human vs. AI game
  } else if (selectedGameType === "human-AI") {
    gameTypeInfo.innerText =
      "You are PLAYER 1, you will be playing against AI PLAYER 2.";
    playerOne.innerText = "You are Player 1, your symbol is X - good luck!";
    playerTwo.innerText = "Player 2 is AI - its symbol is O.";
    start_AI_vs_human_game();
    // AI vs. AI game
  } else {
    gameTypeInfo.innerText =
      "You choose the game type of AI vs. AI. Good watching!";
    playerOne.innerText = "Player 1 symbol - X.";
    playerTwo.innerText = "Player 2 symbol - O.";
    start_AI_vs_AI_game();
  }
});

// DISPLAY WHOSE TURN IT IS
export function playerTurn(currentPlayer) {
  const playerOneTurn = document.getElementById("player1");
  const playerTwoTurn = document.getElementById("player2");

  if (currentPlayer === 1) {
    playerOneTurn.classList.add("active-player");
    playerTwoTurn.classList.remove("active-player");
  } else {
    playerOneTurn.classList.remove("active-player");
    playerTwoTurn.classList.add("active-player");
  }
}

// CHECK IF THE GRID IS FULL
export function isGridFull() {
  const gridItems = document.querySelectorAll(".grid-item");
  return Array.from(gridItems).every((item) => item.innerText !== "");
}

// CHECK FOR A GAME WINNER
export function gameWinner() {
  const gridItems = document.querySelectorAll(".grid-item");

  // all possible winning combinations
  const winCombinations = [
    [0, 1, 2, 3], // top row
    [4, 5, 6, 7], // middle row
    [8, 9, 10, 11], // bottom row
    [12, 13, 14, 15], // last row
    [0, 4, 8, 12], // left column
    [1, 5, 9, 13], // second column
    [2, 6, 10, 14], // third column
    [3, 7, 11, 15], // right column
    [0, 5, 10, 15], // diagonal
    [3, 6, 9, 12], // diagonal
  ];

  // loop through each winning combination
  for (const combination of winCombinations) {
    const [a, b, c, d] = combination;
    const symbols = [
      gridItems[a].innerText,
      gridItems[b].innerText,
      gridItems[c].innerText,
      gridItems[d].innerText,
    ];

    // if all symbols in this combination are the same and not empty, there is a winner
    if (symbols.every((symbol) => symbol === "X")) {
      return { symbol: "X", cells: [a, b, c, d] };
    } else if (symbols.every((symbol) => symbol === "O")) {
      return { symbol: "O", cells: [a, b, c, d] };
    }
  }
  // return null if there is no winner
  return null;
}

// CHECK FOR A WINNER PLAYER AND HANDLE THE GAME OVER STATE
export function checkForWinner(currentPlayer) {
  const winner = gameWinner();

  if (winner && (winner.symbol === "X" || winner.symbol === "O")) {
    const winnerMsgContainer = document.getElementById("winner-msg-container");
    winnerMsgContainer.style.display = "block";

    const winnerMsg = document.getElementById("winner-msg");
    if (
      (winner.symbol === "X" && currentPlayer === 1) ||
      (winner.symbol === "O" && currentPlayer === 2)
    ) {
      winnerMsg.innerHTML = `Player ${currentPlayer} wins!`;
    } else {
      winnerMsg.innerHTML = `Player ${currentPlayer === 1 ? 2 : 1} wins!`;
    }

    // set the game over state to true
    gameOver = true;
  } else if (isGridFull()) {
    const winnerMsgContainer = document.getElementById("winner-msg-container");
    winnerMsgContainer.style.display = "block";

    const winnerMsg = document.getElementById("winner-msg");
    winnerMsg.innerHTML = "It's a tie! The grid is full.";

    // set the game over state to true
    gameOver = true;
  }
}
