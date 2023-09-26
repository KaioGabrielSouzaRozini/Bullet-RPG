const canvas = document.getElementById("space");
const pincel = canvas.getContext("2d");
let gameOver = document.getElementById("gameover");
let playerGun = document.getElementById("weapon");
let playerAmmo = document.getElementById("ammo");

document.body.addEventListener("keydown", (key) => {
  drive(key);
});

class Game {
  constructor(moves) {
    (this.moves = moves), (this.turn = true), (this.points = 0);
  }
}

class Player {
  constructor(x, y, size) {
    (this.x = x),
      (this.y = y),
      (this.size = size),
      (this.recharge = false),
      (this.rechargeTime = 800),
      this.weapon,
      (this.shoots = []);
  }
}

class Enemy {
  constructor(name, x, y) {
    (this.name = name),
      (this.x = x),
      (this.y = y),
      (this.size = 30),
      (this.side = true);
  }
}

class Gun {
  constructor(name, x, y, ammo) {
    (this.name = name),
      (this.x = x),
      (this.y = y),
      (this.size = 30),
      (this.ammo = ammo);
  }
}
let enemys = [];
let player = new Player(0, 0, 30);
let guns = [new Gun("pistol", 60, 120, 6)];
let gameD = new Game(3);
let centralize = 15;
let moves = 3;

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
      if (player.y < 840 && gameD.turn == true) {
        player.y += 60;
        gameD.moves -= 1;
      }
      break;
    case "a":
      if (gameD.turn == true && player.recharge == true) {
        player.shoots.push({ x: player.x, y: player.y, direction: 0 });
        gameD.moves -= 1;
        player.weapon.shoot -= 1;
        playerAmmo.innerText = player.weapon.shoot;
        if (player.weapon.shoot == 0) {
          player.recharge = false;
        }
      }
      break;
    case "d":
      if (gameD.turn == true && player.recharge == true) {
        player.shoots.push({ x: player.x, y: player.y, direction: 1 });
        gameD.moves -= 1;
        player.weapon.shoot -= 1;
        playerAmmo.innerText = player.weapon.shoot;
        if (player.weapon.shoot == 0) {
          player.recharge = false;
        }
      }
      break;
    case "w":
      if (gameD.turn == true && player.recharge == true) {
        player.shoots.push({ x: player.x, y: player.y, direction: 2 });
        gameD.moves -= 1;
        player.weapon.shoot -= 1;
        playerAmmo.innerText = player.weapon.shoot;
        if (player.weapon.shoot == 0) {
          player.recharge = false;
        }
      }
      break;
    case "s":
      if (gameD.turn == true && player.recharge == true) {
        player.shoots.push({ x: player.x, y: player.y, direction: 3 });
        gameD.moves -= 1;
        player.weapon.shoot -= 1;
        playerAmmo.innerText = player.weapon.shoot;
        if (player.weapon.shoot == 0) {
          player.recharge = false;
        }
      }
      break;
  }
}
function turno() {
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
function enemyTurn() {
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
  let gunProb = Math.round(Math.random() * 4);
  if (gunProb == 3) {
    let = gunX = Math.round(Math.random() * 10) * 60;
    let = gunY = Math.round(Math.random() * 10) * 60;
    guns.push(new Gun("pistol", gunX, gunY, 6));
  } else if (gunProb == 4) {
    let = gunX = Math.round(Math.random() * 10) * 60;
    let = gunY = Math.round(Math.random() * 10) * 60;
    guns.push(new Gun("machinegun", gunX, gunY, 12));
  }

  gameD.moves = 0;
}

function spawnMonster() {
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

function monstersMoves() {
  for (var i = 0; i < enemys.length; i++) {
    if (player.x == enemys[i].x) {
      if (player.y > enemys[i].y) {
        enemys[i].y += 60;
      } else if (player.y < enemys[i].y) {
        enemys[i].y -= 60;
      }
    }
    if (player.y == enemys[i].y) {
      if (player.x > enemys[i].x) {
        enemys[i].x += 60;
      } else if (player.x < enemys[i].x) {
        enemys[i].x -= 60;
      }
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

function drawReact(x, y, size, color) {
  pincel.fillStyle = color;
  pincel.fillRect(x, y, size, size);
}

function update() {
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

  if (gameD.moves == 0) {
    turno();
  }

  player.shoots.forEach((v) => {
    enemys.forEach((j) => {
      if (v.y == j.y && v.x >= j.x - 20 && v.x <= j.x + 60) {
        player.shoots.shift();
        let index = enemys.indexOf(j);
        enemys.splice(index, 1);
      }
    });
  });

  for (var i = 0; i < enemys.length; i++) {
    if (enemys[i].x == player.x && enemys[i].y == player.y) {
      gameOver.innerText = "Game Over";
      clearInterval(interval);
    }
  }
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

function draw() {
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
  drawReact(player.x + centralize, player.y + centralize, player.size, "red");

  for (var i = 0; i < enemys.length; i++) {
    drawReact(
      enemys[i].x + centralize,
      enemys[i].y + centralize,
      enemys[i].size,
      "blue"
    );
  }

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

function game() {
  update();
  draw();
}

function gameLoop() {
  interval = setInterval(game, 1000 / 30);
}
gameLoop();
