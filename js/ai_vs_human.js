// import necessary functions and variables from the script.js file
import {
  gameOver,
  currentPlayer,
  gridItems,
  playerTurn,
  isGridFull,
  gameWinner,
} from "./script.js";

// AI vs HUMAN GAME
export function start_AI_vs_human_game() {
  // local variables to keep track of game state
  const gridItems = document.querySelectorAll(".grid-item");
  let currentPlayer = 1;
  let gameOver = false;

  // add an event listener to the "Start Game" button
  const startGameBtn = document.getElementById("start-game-btn");
  startGameBtn.addEventListener("click", () => {
    if (startGameBtn.innerText === "START GAME") {
      // if the game is starting, change the button text to "RESTART"
      startGameBtn.innerText = "RESTART";
      currentPlayer = 1; // reset current player to Player 1
      gameOver = false; // reset game over state to false

      gridItems.forEach((item) => {
        // clear the grid cells by removing the previous symbols
        item.innerText = "";
      });

      // start the game with Player 1 (human) and AI's turn after a delay
      currentPlayer = 1;
      gridItems.forEach((item) => {
        item.addEventListener("click", () => {
          // when a grid item is clicked, check if the game is not over and the cell is empty
          if (!gameOver && item.innerText === "") {
            if (currentPlayer === 1) {
              item.innerText = "X"; // set the cell to "X" for Human Player's turn
              currentPlayer = 2; // switch to AI's turn
              setTimeout(aiMove, 500); // automatically trigger AI move after 500ms
            }

            // check for the winner after each symbol is added
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
                winnerMsg.innerHTML = `Player ${
                  currentPlayer === 1 ? 2 : 1
                } wins!`;
              }

              // highlight the winning cells
              winnerData.cells.forEach((cellIndex) => {
                gridItems[cellIndex].classList.add("winning-cell");
              });

              // set the game over state to true
              gameOver = true;
            } else if (isGridFull()) {
              // if the grid is full and there's no winner, it's a tie
              const winnerMsgContainer = document.getElementById(
                "winner-msg-container"
              );
              winnerMsgContainer.style.display = "block";

              const winnerMsg = document.getElementById("winner-msg");
              winnerMsg.innerHTML = "It's a tie! The grid is full.";

              // set the game over state to true
              gameOver = true;
            }

            if (gameOver) {
              // disable further symbol addition once the game is over
              gridItems.forEach((item) => {
                item.removeEventListener("click", start_AI_vs_human_game);
              });
            } else {
              // switch player turns if the game is not over
              currentPlayer = currentPlayer === 1 ? 2 : 1;
              playerTurn(currentPlayer);
            }
          }
        });
      });
    } else {
      location.reload(); // if the "RESTART" button is clicked, reload the page to start a new game
    }
  });
}

// AI's move
function aiMove() {
  // get all empty cells in the grid
  const emptyCells = Array.from(gridItems).filter(
    (item) => item.innerText === ""
  );
  if (emptyCells.length > 0) {
    // choose a random empty cell and set it to "O" for AI's move
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.innerText = "O";
  }
}
