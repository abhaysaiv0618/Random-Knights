document.querySelector(".p1-name").textContent = localStorage.getItem("p1Name");
document.querySelector(".p2-name").textContent = localStorage.getItem("p2Name");

const p1HealthObj = document.querySelector(".p1-health");
const p1powerUpObj = document.querySelector(".p1-powerUp");
const p1 = [p1HealthObj, p1powerUpObj];

const p2HealthObj = document.querySelector(".p2-health");
const p2PowerUpObj = document.querySelector(".p2-powerUp");
const p2 = [p2HealthObj, p2PowerUpObj];

const players = [p1, p2];

const btnStart = document.querySelector(".start-button");

const btnRoll = document.querySelector(".roll-button");
const diceObj = document.querySelector(".dice");

const btnAttack = document.querySelector(".attack-button");
btnAttack.classList.add("hidden");

const btnHeal = document.querySelector(".heal-button");
btnHeal.classList.add("hidden");

const btnRestart = document.querySelector(".restart-button");
const btnHome = document.querySelector(".home-button");

let activePlayer = 1;
let dice = 1;
let damage;

//btn events
btnStart.addEventListener("click", function () {
  btnStart.classList.add("hidden");
  btnRoll.classList.remove("hidden");
  document.querySelector("body").style.backgroundColor = "#91806e";
  document.querySelector(".p1").classList.add("active-player");
});

//roll
btnRoll.addEventListener("click", function () {
  dice = Math.trunc(Math.random() * 7) + 1;
  console.log(`dice is rolled: ${dice}`);
  if (dice === 7) {
    diceObj.src = "imgs/joker.jpg";
    switchPlayer(true);
  } else {
    diceObj.src = `imgs/dice-${dice}.png`;
    hideOrShow("add", "remove");
  }
});

//attack
btnAttack.addEventListener("click", function () {
  const player = activePlayer === 1 ? 2 : 1;

  let health = Number(players[player - 1][0].textContent);
  let powerUp = Number(players[player - 1][1].textContent);
  if (powerUp !== 3) {
    if (powerUp === 2) {
      document.querySelector(`.p${activePlayer}-powerUp-status`).textContent =
        "✅";
    }
    damage = dice * 5;
    powerUp++;
  } else {
    damage = dice * 10;
    powerUp = 0;
    document.querySelector(`.p${activePlayer}-powerUp-status`).textContent =
      "❌";
  }
  if (health - damage > 0) {
    health = health - damage;
    players[player - 1][0].textContent = health;
    players[player - 1][1].textContent = powerUp;

    hideOrShow("remove", "add");
    switchPlayer(false);
  } else {
    health = 0;
    players[player - 1][0].textContent = health;
    gameOver(activePlayer);
  }
});

//Heal
btnHeal.addEventListener("click", function () {
  let health = Number(players[activePlayer - 1][0].textContent);
  if (health != 100) {
    if (health + dice * 3 <= 100) {
      health = health + dice * 3;
    } else {
      health = 100;
    }
    players[activePlayer - 1][0].textContent = health;
    hideOrShow("remove", "add");
    switchPlayer(false);
  } else {
    alert("ALREADY AT MAX HEALTH!!!!!!");
  }
});

btnRestart.addEventListener("click", function () {
  window.open("game.html", "_top");
});

btnHome.addEventListener("click", function () {
  window.open("index.html", "_top");
});

//functions
function hideOrShow(changeRoll, changeOption) {
  btnRoll.classList[changeRoll]("hidden");
  btnAttack.classList[changeOption]("hidden");
  btnHeal.classList[changeOption]("hidden");
}

function switchPlayer(jokerimg) {
  if (!jokerimg) diceObj.src = "imgs/Knight_Battle.jpg";
  document.querySelector(`.p1-name`).classList.toggle("active-player");
  document.querySelector(`.p2-name`).classList.toggle("active-player");
  activePlayer = activePlayer === 1 ? 2 : 1;
}

function gameOver(activePlayer) {
  // document.querySelector("body").style.backgroundColor = "#c6ad95";

  document
    .querySelector(`.p${activePlayer}-name`)
    .classList.remove("active-player");

  document.querySelector(`.player-${activePlayer}`).classList.add("winner");
  let winner = document.querySelector(`.p${activePlayer}-name`).textContent;
  winner = `👑 ${winner} 👑`;
  document.querySelector(`.p${activePlayer}-name`).textContent = winner;

  activePlayer = activePlayer === 1 ? 2 : 1;
  document.querySelector(`.player-${activePlayer}`).classList.add("loser");
  let loser = document.querySelector(`.p${activePlayer}-name`).textContent;
  loser = `😢 ${loser} 😢`;
  document.querySelector(`.p${activePlayer}-name`).textContent = loser;

  hideOrShow("add", "add");
  diceObj.classList.add("hidden");

  removeFromArr(document.querySelectorAll(".powerUp"));
  removeFromArr(document.querySelectorAll(".nav-bar"));

  btnRestart.classList.remove("hidden");
  btnHome.classList.remove("hidden");
}

function removeFromArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].classList.add("hidden");
  }
}
