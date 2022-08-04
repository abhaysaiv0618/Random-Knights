const q1 = document.querySelector(".input-box-1");
const qp1btn = document.getElementById("btn-q-1");

const hiddenBox = document.getElementById("hidden-box");
const q2 = document.querySelector(".input-box-2");
const qp2btn = document.getElementById("btn-q-2");

const startbtn = document.querySelector(".start-button");

//Players Choose their Names

let player1Name = "Player 1";
let player2Name = "Player 2";

qp1btn.addEventListener("click", function () {
  const v = document.getElementById("input-box-1").value;
  if (v !== "") {
    player1Name = v;
  }
  hiddenBox.removeAttribute("id");
});

qp2btn.addEventListener("click", function () {
  const v = document.getElementById("input-box-2").value;
  if (v !== "") {
    player2Name = v;
  }
  startbtn.classList.remove("hidden");
});

//Start Game
startbtn.addEventListener("click", function () {
  window.open("game.html", "_top");
  localStorage.setItem("p1Name", player1Name);
  localStorage.setItem("p2Name", player2Name);
});
