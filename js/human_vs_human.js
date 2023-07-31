import {
  gridItems,
  playerTurn,
  isGridFull,
  gameWinner,
  checkForWinner,
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

            // check winner
            const winnerData = gameWinner();
            if (
              winnerData &&
              (winnerData.symbol === "X" || winnerData.symbol === "O")
            ) {
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
                winnerMsg.innerHTML = `Player ${
                  currentPlayer === 1 ? 2 : 1
                } wins!`;
              }

              // Highlight the winning cells
              winnerData.cells.forEach((cellIndex) => {
                gridItems[cellIndex].classList.add("winning-cell");
              });

              gameOver = true;
            } else if (isGridFull()) {
              const winnerMsgContainer = document.getElementById(
                "winner-msg-container"
              );
              winnerMsgContainer.style.display = "block";

              const winnerMsg = document.getElementById("winner-msg");
              winnerMsg.innerHTML = "It's a tie! The grid is full.";

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
