export class Game {
  constructor(moves) {
    (this.moves = moves), (this.turn = true), (this.points = 0);
  }
}

export class Player {
  constructor(x, y, size) {
    (this.x = x),
      (this.y = y),
      (this.size = size),
      (this.recharge = false),
      (this.rechargeTime = 800),
      this.weapon,
      (this.shoots = []),
      (this.lifes = 3);
  }
}

export class Gun {
  constructor(index, name, x, y, ammo) {
    (this.index = index),
      (this.name = name),
      (this.x = x),
      (this.y = y),
      (this.size = 30),
      (this.ammo = ammo);
  }
}
