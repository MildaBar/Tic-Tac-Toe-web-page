// import necessary functions and variables from the script.js file
import {
  gameOver,
  currentPlayer,
  gridItems,
  playerTurn,
  isGridFull,
  gameWinner,
} from "./script.js";

// AI vs AI GAME
export function start_AI_vs_AI_game() {
  // local variables to keep track of game state
  const gridItems = document.querySelectorAll(".grid-item");
  const startGameBtn = document.getElementById("start-game-btn");
  let currentPlayer = 1;
  let gameOver = false;

  // AI X's move
  function aiMoveX() {
    // get all empty cells in the grid
    const emptyCells = Array.from(gridItems).filter(
      (item) => item.innerText === ""
    );
    if (emptyCells.length > 0 && !gameOver) {
      // choose a random empty cell and set it to "X" for AI X's move
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCell.innerText = "X";
      currentPlayer = 2; // switch to AI O's turn
      checkForWinner(); // check if there's a winner
      playerTurn(currentPlayer); // update the player turn display
      setTimeout(aiMoveO, 500); // call AI O's move after 500ms
    }
  }

  // AI O's move
  function aiMoveO() {
    // get all empty cells in the grid
    const emptyCells = Array.from(gridItems).filter(
      (item) => item.innerText === ""
    );
    if (emptyCells.length > 0 && !gameOver) {
      // choose a random empty cell and set it to "O" for AI O's move
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCell.innerText = "O";
      currentPlayer = 1; // switch to AI X's turn
      checkForWinner(); // check if there's a winner after AI O's move
      playerTurn(currentPlayer); // update the player turn display
      setTimeout(aiMoveX, 500); // call AI X's move after 500ms
    }
  }

  // check for a winner
  function checkForWinner() {
    const winnerData = gameWinner();
    if (
      winnerData &&
      (winnerData.symbol === "X" || winnerData.symbol === "O")
    ) {
      // if there's a winner, display the winner message and highlight the winning cells
      const winnerMsgContainer = document.getElementById(
        "winner-msg-container"
      );
      winnerMsgContainer.style.display = "block";

      const winnerMsg = document.getElementById("winner-msg");
      if (
        (winnerData.symbol === "X" && currentPlayer === 1) ||
        (winnerData.symbol === "O" && currentPlayer === 2)
      ) {
        winnerMsg.innerHTML = `Player ${currentPlayer} wins!`;
      } else {
        winnerMsg.innerHTML = `Player ${currentPlayer === 1 ? 2 : 1} wins!`;
      }

      // highlight the winning cells
      winnerData.cells.forEach((cellIndex) => {
        gridItems[cellIndex].classList.add("winning-cell");
      });

      gameOver = true;
    } else if (isGridFull()) {
      // if the grid is full and there's no winner, it's a tie
      const winnerMsgContainer = document.getElementById(
        "winner-msg-container"
      );
      winnerMsgContainer.style.display = "block";

      const winnerMsg = document.getElementById("winner-msg");
      winnerMsg.innerHTML = "It's a tie! The grid is full.";

      gameOver = true;
    }
  }

  // add an event listener to the "Start Game" button
  startGameBtn.addEventListener("click", () => {
    if (startGameBtn.innerText === "START GAME") {
      // if the game is starting, change the button text to "RESTART"
      startGameBtn.innerText = "RESTART";
      currentPlayer = 1; // reset current player to Player 1
      gameOver = false; // reset game over state to false

      gridItems.forEach((item) => (item.innerText = "")); // clear the grid cells

      currentPlayer = 2; // start with AI O's move
      setTimeout(aiMoveO, 500); // call AI O's move after 500ms

      if (gameOver) {
        // disable further symbol addition once the game is over
        gridItems.forEach((item) => {
          item.removeEventListener("click", start_AI_vs_human_game);
        });
      } else {
        // switch player turns if the game is not over
        currentPlayer = currentPlayer === 1 ? 2 : 1;
      }
    } else {
      location.reload(); // if the "RESTART" button is clicked, reload the page to start a new game
    }
  });
}
