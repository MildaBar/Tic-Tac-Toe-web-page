import {
  gameOver,
  currentPlayer,
  gridItems,
  playerTurn,
  isGridFull,
  gameWinner,
} from "./script.js";

export function start_AI_vs_AI_game() {
  const gridItems = document.querySelectorAll(".grid-item");
  const startGameBtn = document.getElementById("start-game-btn");
  let currentPlayer = 1;
  let gameOver = false;

  function aiMoveX() {
    const emptyCells = Array.from(gridItems).filter(
      (item) => item.innerText === ""
    );
    if (emptyCells.length > 0 && !gameOver) {
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCell.innerText = "X";
      currentPlayer = 2;
      checkForWinner();
      playerTurn(currentPlayer);
      setTimeout(aiMoveO, 500); // Call AI O's move after 500ms
    }
  }

  function aiMoveO() {
    // AI O's move logic
    const emptyCells = Array.from(gridItems).filter(
      (item) => item.innerText === ""
    );
    if (emptyCells.length > 0 && !gameOver) {
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCell.innerText = "O";
      currentPlayer = 1;
      checkForWinner(); // Check for a winner after AI O's move
      playerTurn(currentPlayer);
      setTimeout(aiMoveX, 500); // Call AI X's move after 500ms
    }
  }

  function checkForWinner() {
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
        winnerMsg.innerHTML = `Player ${currentPlayer === 1 ? 2 : 1} wins!`;
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
  }

  startGameBtn.addEventListener("click", () => {
    if (startGameBtn.innerText === "START GAME") {
      startGameBtn.innerText = "RESTART";
      currentPlayer = 1;
      gameOver = false;

      gridItems.forEach((item) => (item.innerText = "")); // Clear the grid cells

      currentPlayer = 2; // Start with AI O's move
      setTimeout(aiMoveO, 500); // Call AI O's move after 500ms

      if (gameOver) {
        // Disable further symbol addition once the game is over
        gridItems.forEach((item) => {
          item.removeEventListener("click", start_AI_vs_human_game);
        });
      } else {
        // Switch player turns if the game is not over
        currentPlayer = currentPlayer === 1 ? 2 : 1;
      }
    } else {
      location.reload();
    }
  });
}
