const Bubbles = require("./bubbles");
const Ship = require("./ship.js");
const Util = require("./util.js");
const $ = require("jquery");

class Game {
  constructor() {
    this.bubbles = [];
    this.ship = [];
    this.score = 0;

    this.addBubbles();

    console.log(this.bubbles);
  }

  add(object) {
    if (object instanceof Bubbles){
      this.bubbles.push(object);
    }else if (object instanceof Ship){
      this.ship.push(object);
    }
  }

  addBubbles() {
    for (let i = 0; i < Game.NUM_BUBBLES; i++) {
      this.add(new Bubbles({ game: this }));
    }
  }

  addShip() {
    const ship = new Ship({
      pos: this.randomPosition(),
      game: this
    });

    this.add(ship);

    return ship;
  }

  allObjects() {
    return [].concat(this.ship,this.bubbles);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision){
            if((obj1 instanceof Ship)|| obj2 instanceof Ship){
              this.score++;
            }
            return;
          }
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

    $('.score').html(`Score: ${this.score}`)

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
    if (object instanceof Bubbles){
      this.bubbles.splice(this.bubbles.indexOf(object), 1);
    }else if (object instanceof Ship){
      this.ship = [];
    }
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

Game.BG_COLOR = "black";
Game.DIM_X = window.innerWidth;
Game.DIM_Y = window.innerHeight;
Game.FPS = 60;
Game.NUM_BUBBLES = 70;

module.exports = Game;
