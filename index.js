import { Player, Game, Gun } from "./class.js";
import {
  launch,
  turn,
  hitShot,
  hitEnemy,
  takeGun,
  drawBullets,
  drawEnemys,
  drawGuns,
} from "./functions.js";

const canvas = document.getElementById("space");
const pincel = canvas.getContext("2d");
let gameOver = document.getElementById("gameover");

document.body.addEventListener("keydown", (key) => {
  drive(key);
});

export let enemys = [];
export let player = new Player(0, 0, 30);
export let guns = [new Gun(0, "pistol", 60, 120, 6)];
export let gameD = new Game(3);
export let centralize = 15;
export let moves = 3;
export let gunIndex = 0;
export let level = 1;
let interval;

function drive(key) {
  switch (key.key) {
    case "ArrowRight":
      if (player.x < 840 && gameD.turn == true) {
        player.x += 60;
        gameD.moves -= 1;
      }
      break;
    case "ArrowLeft":
      if (player.x > 40 && gameD.turn == true) {
        player.x -= 60;
        gameD.moves -= 1;
      }
      break;
    case "ArrowUp":
      if (player.y > 40 && gameD.turn == true) {
        player.y -= 60;
        gameD.moves -= 1;
      }
      break;
    case "ArrowDown":
      if (player.y < 540 && gameD.turn == true) {
        player.y += 60;
        gameD.moves -= 1;
      }
      break;
    case "a":
      launch(0);
      break;
    case "d":
      launch(1);
      break;
    case "w":
      launch(2);
      break;
    case "s":
      launch(3);
      break;
  }
}
export function drawReact(x, y, size, color) {
  pincel.fillStyle = color;
  pincel.fillRect(x, y, size, size);
}

export function drawArena() {
  for (var i = 0; i <= 600; i += 60) {
    for (var j = 0; j <= 900; j += 60) {
      drawReact(j, i, 60, "black");
    }
  }
  for (var i = 0; i <= 600; i += 60) {
    for (var j = 0; j <= 900; j += 60) {
      drawReact(j + 3, i + 3, 54, "white");
    }
  }
}

function update() {
  drawArena();
  hitShot();
  hitEnemy();
  takeGun();
  if (gameD.moves == 0) {
    turn();
  }
  if (player.lifes <= 0) {
    gameOver.innerText = "Game Over";
    clearInterval(interval);
  }
}

function draw() {
  drawGuns();
  drawEnemys();
  drawBullets();
  drawReact(player.x + centralize, player.y + centralize, player.size, "red");
}
function game() {
  update();
  draw();
}

function gameLoop() {
  interval = setInterval(game, 1000 / 30);
}
gameLoop();
