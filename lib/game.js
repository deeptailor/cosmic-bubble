const Bubbles = require("./bubbles");
const Util = require("./util.js")

class Game {
  constructor() {
    this.bubbles = [];

    this.addBubbles();

    console.log(this.bubbles);
  }

  add(object) {
    this.bubbles.push(object);
  }

  addBubbles() {
    for (let i = 0; i < Game.NUM_BUBBLES; i++) {
      this.add(new Bubbles({ game: this }));
    }
  }

  allObjects() {
    return [].concat(this.bubbles);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }

  remove(object) {
    this.bubbles.splice(this.bubbles.indexOf(object), 1);
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  }
}

Game.BG_COLOR = "white";
Game.DIM_X = 1400;
Game.DIM_Y = 700;
Game.FPS = 60;
Game.NUM_BUBBLES = 60;

module.exports = Game;
