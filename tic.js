let msg_container = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let new_btn = document.querySelector("#new-btn");
let reset_btn = document.querySelector("#reset-btn");
let boxes = document.querySelectorAll(".box");
let count = 0;

let win_patterns = [
  [0, 3, 6],
  [0, 1, 2],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

let turnO = true;
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "O";
      turnO = false;
    } else {
      box.innerHTML = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      drawGame();
    }
  });
});

function drawGame() {
  msg_container.classList.remove("hide");
  msg.innerHTML = `The Game is Draw`;
}

function checkWinner() {
  for (let pattern of win_patterns) {
    let posVal1 = boxes[pattern[0]].innerHTML;
    let posVal2 = boxes[pattern[1]].innerHTML;
    let posVal3 = boxes[pattern[2]].innerHTML;
    if (posVal1 != "" && posVal1 === posVal2 && posVal2 === posVal3) {
      showWinner(posVal1);
      return true;
    }
  }
  return false;
}

function showWinner(winner) {
  msg_container.classList.remove("hide");
  msg.innerHTML = `The winner is ${winner}`;
  disableBoxes();
}

function disableBoxes() {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}

function enableBoxes() {
  turnO = true;
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerHTML = "";
  });
  msg_container.classList.add("hide");
  count = 0;
}

reset_btn.addEventListener("click", enableBoxes);
new_btn.addEventListener("click", enableBoxes);
