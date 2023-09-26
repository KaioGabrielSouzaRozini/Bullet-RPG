import {
  player,
  enemys,
  guns,
  gameD,
  moves,
  drawReact,
  centralize,
} from "./index.js";
import { Gun } from "./class.js";

let playerGun = document.getElementById("weapon");
let playerAmmo = document.getElementById("ammo");
let playerLifes = document.getElementById("lifes");
let playerLevel = document.getElementById("level");

let gunIndex = 0;
export let level = 1;

export function launch(direction) {
  if (gameD.turn == true && player.recharge == true) {
    player.shoots.push({ x: player.x, y: player.y, direction: direction });
    gameD.moves -= 1;
    player.weapon.shoot -= 1;
    playerAmmo.innerText = player.weapon.shoot;
    if (player.weapon.shoot == 0) {
      player.recharge = false;
    }
  }
}

export function turn() {
  if (gameD.turn) {
    gameD.turn = false;
    enemyTurn();
  } else {
    gameD.moves += moves;
    setTimeout(() => {
      gameD.turn = true;
    }, 1000);
  }
}
export function enemyTurn() {
  gameD.moves = 3;
  for (var i = 0; i < gameD.moves; i++) {
    let monstersMove = Math.round(Math.random());
    if (enemys.length != 0) {
      if (enemys.length > 9) {
        setTimeout(() => {
          monstersMoves();
        }, 500);
      } else {
        if (monstersMove == 1) {
          setTimeout(() => {
            spawnMonster();
          }, 500);
        } else if (monstersMove == 0) {
          setTimeout(() => {
            monstersMoves();
          }, 500);
        }
      }
    } else {
      spawnMonster();
    }
  }
  let gunProb = Math.round(Math.random() * 3);
  if (gunProb == 3) {
    spawnGun("pistol", 6);
  } else if (gunProb == 2) {
    spawnGun("machinegun", 12);
  }
  level += 1;
  playerLevel.innerText = level;
  gameD.moves = 0;
}

export function spawnGun(gunName, ammo) {
  gunIndex += 1;
  let gunX = Math.round(Math.random() * 10) * 60;
  let gunY = Math.round(Math.random() * 10) * 60;

  if (guns.length > 0) {
    for (var i = 0; i < guns.length; i++) {
      if (guns[i].x == gunX && guns[i].y == gunY) {
      } else {
        guns.push(new Gun(gunIndex, gunName, gunX, gunY, ammo));
      }
    }
  } else {
    guns.push(new Gun(gunIndex, gunName, gunX, gunY, ammo));
  }
}

export function spawnMonster() {
  let monsterX = Math.round(Math.random() * 15) * 60;
  let monsterY = Math.round(Math.random() * 10) * 60;

  if (
    (player.x == monsterX && player.y == monsterY) ||
    (player.x + 60 == monsterX && player.y == monsterY) ||
    (player.x - 60 == monsterX && player.y == monsterY) ||
    (player.x == monsterX && player.y + 60 == monsterY) ||
    (player.x == monsterX && player.y - 60 == monsterY)
  ) {
    monsterX = Math.round(Math.random() * 15) * 60;
    monsterY = Math.round(Math.random() * 10) * 60;
    enemys.push({ x: monsterX, y: monsterY, size: 30 });
  } else {
    enemys.push({ x: monsterX, y: monsterY, size: 30 });
  }
}

export function monstersMoves() {
  for (var i = 0; i < enemys.length; i++) {
    if (player.x == enemys[i].x) {
      if (player.y > enemys[i].y) {
        enemys[i].y += 60;
      } else if (player.y < enemys[i].y) {
        enemys[i].y -= 60;
      }
    }
    if (player.y == enemys[i].y && player.x > enemys[i].x) {
      enemys[i].x += 60;
    } else if (player.y == enemys[i].y && player.x < enemys[i].x) {
      enemys[i].x -= 60;
    }
    if (player.y != enemys[i].y && player.x != enemys[i].x) {
      let random = Math.round(Math.random());
      if (random == 1) {
        if (player.x > enemys[i].x) {
          enemys[i].x += 60;
        } else if (player.x < enemys[i].x) {
          enemys[i].x -= 60;
        }
      } else if (random == 0) {
        if (player.y > enemys[i].y) {
          enemys[i].y += 60;
        } else if (player.y < enemys[i].y) {
          enemys[i].y -= 60;
        }
      }
    }
  }
}

export function hitShot() {
  player.shoots.forEach((v) => {
    enemys.forEach((j) => {
      if (v.y == j.y && v.x >= j.x - 20 && v.x <= j.x + 60) {
        player.shoots.shift();
        let index = enemys.indexOf(j);
        enemys.splice(index, 1);
      }
    });
  });
}

export function hitEnemy() {
  for (var i = 0; i < enemys.length; i++) {
    if (enemys[i].x == player.x && enemys[i].y == player.y) {
      let index = enemys.indexOf(enemys[i]);
      enemys.splice(index, 1);
      player.lifes -= 1;
      playerLifes.innerText = player.lifes;
    }
  }
}
export function takeGun() {
  for (var i = 0; i < guns.length; i++) {
    if (guns[i].x == player.x && guns[i].y == player.y) {
      guns.forEach((j) => {
        playerGun.innerText = j.name;
        playerAmmo.innerText = j.ammo;
        player.weapon = { shoot: j.ammo };
        player.recharge = true;
        let index = guns.indexOf(j);
        guns.splice(index, 1);
      });
    }
  }
}
export function drawGuns() {
  if (guns.length > 0) {
    for (var i = 0; i < guns.length; i++) {
      if (guns[i].name == "pistol") {
        drawReact(
          guns[i].x + centralize,
          guns[i].y + centralize,
          guns[i].size,
          "purple"
        );
      } else if (guns[i].name == "machinegun") {
        drawReact(
          guns[i].x + centralize,
          guns[i].y + centralize,
          guns[i].size,
          "green"
        );
      }
    }
  }
}

export function drawEnemys() {
  for (var i = 0; i < enemys.length; i++) {
    drawReact(
      enemys[i].x + centralize,
      enemys[i].y + centralize,
      enemys[i].size,
      "blue"
    );
  }
}

export function drawBullets() {
  for (var i = 0; i < player.shoots.length; i++) {
    drawReact(
      player.shoots[i].x + centralize,
      player.shoots[i].y + centralize,
      player.size,
      "yellow"
    );

    if (player.shoots[i].direction == 0) {
      player.shoots[i].x -= 15;
    } else if (player.shoots[i].direction == 1) {
      player.shoots[i].x += 15;
    } else if (player.shoots[i].direction == 2) {
      player.shoots[i].y -= 15;
    } else if (player.shoots[i].direction == 3) {
      player.shoots[i].y += 15;
    }
    if (
      player.shoots[i].y < 0 ||
      player.shoots[i].y > 900 ||
      player.shoots[i].x > 900 ||
      player.shoots[i].x < 0
    ) {
      player.shoots.shift();
    }
  }
}
