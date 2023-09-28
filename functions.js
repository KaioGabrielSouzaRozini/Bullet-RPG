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
    if (playerGun.innerText == "shotgun") {
      switch (direction) {
        case 0:
          player.shoots.push({
            x: player.x,
            y: player.y,
            direction: direction,
          });
          player.shoots.push({
            x: player.x,
            y: player.y + 60,
            direction: direction,
          });
          player.shoots.push({
            x: player.x,
            y: player.y - 60,
            direction: direction,
          });
          break;
        case 1:
          player.shoots.push({
            x: player.x,
            y: player.y + 60,
            direction: direction,
          });
          player.shoots.push({
            x: player.x,
            y: player.y - 60,
            direction: direction,
          });
          player.shoots.push({
            x: player.x,
            y: player.y,
            direction: direction,
          });
          break;
        case 2:
          player.shoots.push({
            x: player.x,
            y: player.y,
            direction: direction,
          });
          player.shoots.push({
            x: player.x + 60,
            y: player.y,
            direction: direction,
          });
          player.shoots.push({
            x: player.x - 60,
            y: player.y,
            direction: direction,
          });
          break;
        case 3:
          player.shoots.push({
            x: player.x,
            y: player.y,
            direction: direction,
          });
          player.shoots.push({
            x: player.x + 60,
            y: player.y,
            direction: direction,
          });
          player.shoots.push({
            x: player.x - 60,
            y: player.y,
            direction: direction,
          });
          break;
      }
    } else if (playerGun.innerText == "sniper") {
      player.shoots.push({ x: player.x, y: player.y, direction: direction });
      player.shoots.push({ x: player.x, y: player.y, direction: direction });
      player.shoots.push({ x: player.x, y: player.y, direction: direction });
    } else {
      player.shoots.push({ x: player.x, y: player.y, direction: direction });
    }
    gameD.moves -= 1;
    player.weapon.shoot -= 1;
    playerAmmo.innerText = player.weapon.shoot;
    if (player.weapon.shoot == 0) {
      player.recharge = false;
    }
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
      setTimeout(() => {
        spawnMonster();
      }, 500);
    }
  }
  let gunProb = Math.round(Math.random() * 6);
  if (gunProb == 3) {
    spawnGun("pistol", 6);
  } else if (gunProb == 2) {
    spawnGun("machinegun", 12);
  } else if (gunProb == 4) {
    spawnGun("shotgun", 6);
  } else if (gunProb == 5) {
    spawnGun("sniper", 8);
  }

  level += 1;
  playerLevel.innerText = level;
  gameD.moves = 0;
}

export function spawnMonster() {
  let monsterX = Math.round(Math.random() * 15) * 60;
  let monsterY = Math.round(Math.random() * 10) * 60;

  if (Number.isInteger(level / 10)) {
    console.log("boss level");
    enemys.push({ x: monsterX, y: monsterY, size: 30, lifes: 3 });
  }

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

export function hitShot() {
  player.shoots.forEach((v) => {
    enemys.forEach((j) => {
      if (v.y == j.y && v.x >= j.x - 20 && v.x <= j.x + 60) {
        let indexShoot = player.shoots.indexOf(v);
        player.shoots.splice(indexShoot, 1);
        if (j.lifes) {
          j.lifes -= 1;
          if (j.lifes <= 0) {
            let index = enemys.indexOf(j);
            enemys.splice(index, 1);
          }
        } else {
          let index = enemys.indexOf(j);
          enemys.splice(index, 1);
        }
      }
    });
  });
}

export function hitEnemy() {
  enemys.forEach((v) => {
    if (v.x == player.x && v.y == player.y) {
      let index = enemys.indexOf(v);
      enemys.splice(index, 1);
      player.lifes -= 1;
      playerLifes.innerText = player.lifes;
    }
  });
}
export function takeGun() {
  guns.forEach((j) => {
    if (j.x == player.x && j.y == player.y) {
      playerGun.innerText = j.name;
      playerAmmo.innerText = j.ammo;
      player.weapon = { shoot: j.ammo };
      player.recharge = true;
      let index = guns.indexOf(j);
      guns.splice(index, 1);
    }
  });
}
export function drawGuns() {
  if (guns.length > 0) {
    guns.forEach((v) => {
      if (v.name == "pistol") {
        drawReact(v.x + centralize, v.y + centralize, v.size, "purple");
      } else if (v.name == "machinegun") {
        drawReact(v.x + centralize, v.y + centralize, v.size, "green");
      } else if (v.name == "shotgun") {
        drawReact(v.x + centralize, v.y + centralize, v.size, "orange");
      } else if (v.name == "sniper") {
        drawReact(v.x + centralize, v.y + centralize, v.size, "pink");
      }
    });
  }
}

export function drawEnemys() {
  enemys.forEach((v) => {
    if (v.lifes) {
      drawReact(v.x + centralize, v.y + centralize, v.size, "black");
    } else {
      drawReact(v.x + centralize, v.y + centralize, v.size, "blue");
    }
  });
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
