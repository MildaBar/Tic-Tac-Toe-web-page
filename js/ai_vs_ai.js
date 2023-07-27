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
    // AI X's move logic
    const emptyCells = Array.from(gridItems).filter(
      (item) => item.innerText === ""
    );
    if (emptyCells.length > 0 && !gameOver) {
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      randomCell.innerText = "X";
      currentPlayer = 2;
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
      setTimeout(aiMoveX, 500); // Call AI X's move after 500ms
    }
  }

  gameWinner();

  startGameBtn.addEventListener("click", () => {
    if (startGameBtn.innerText === "START GAME") {
      startGameBtn.innerText = "RESTART";
      currentPlayer = 1;
      gameOver = false;

      gridItems.forEach((item) => (item.innerText = "")); // Clear the grid cells
      playerTurn(currentPlayer); // Display current player's turn

      currentPlayer = 2; // Start with AI O's move
      setTimeout(aiMoveO, 500); // Call AI O's move after 500ms
    } else {
      location.reload();
    }
  });
}
