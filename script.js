// Add X , O to cell
function addSymbol(playerType) {
  document.addEventListener("DOMContentLoaded", () => {
    const gridItem = document.querySelectorAll(".grid-item");
    gridItem.forEach((item) => {
      item.addEventListener("click", () => {
        if (playerType === "player-1") {
          item.innerText = "X";
        } else {
          item.innerText = "O";
        }
      });
    });
  });
}
//  did a function which puts x or o depending on player
