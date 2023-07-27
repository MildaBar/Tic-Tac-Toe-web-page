import {
  gameOver,
  currentPlayer,
  gridItems,
  playerTurn,
  isGridFull,
  gameWinner,
} from "./script.js";

// HUMAN VS HUMAN GAME
export function start_human_vs_human_game() {
  const gridItems = document.querySelectorAll(".grid-item");
  let currentPlayer = 1;
  let gameOver = false;

  // Add an event listener to the "Start Game" button
  const startGameBtn = document.getElementById("start-game-btn");
  startGameBtn.addEventListener("click", () => {
    if (startGameBtn.innerText === "START GAME") {
      startGameBtn.innerText = "RESTART";
      currentPlayer = 1;

      gridItems.forEach((item) => {
        item.addEventListener("click", () => {
          if (!gameOver && item.innerText === "") {
            if (currentPlayer === 1) {
              item.innerText = "X";
            } else {
              item.innerText = "O";
            }

            // Check for the winner after each symbol is added
            const winner = gameWinner();
            if (winner === "X") {
              alert("We have a winner! Player 1 wins!");
              gameOver = true;
            } else if (winner === "O") {
              alert("We have a winner! Player 2 wins!");
              gameOver = true;
            } else if (isGridFull()) {
              alert("It's a tie! The grid is full.");
              gameOver = true;
            }

            if (gameOver) {
              // Disable further symbol addition once the game is over
              gridItems.forEach((item) => {
                item.removeEventListener("click", start_human_vs_human_game);
              });
            } else {
              // Switch player turns if the game is not over
              currentPlayer = currentPlayer === 1 ? 2 : 1;
              playerTurn(currentPlayer);
            }
          }
        });
      });
    } else {
      location.reload();
    }
  });
}
