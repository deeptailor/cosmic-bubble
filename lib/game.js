const Bubbles = require("./bubbles");
const Ship = require("./ship.js");
const Util = require("./util.js");
const $ = require("jquery");

class Game {
  constructor() {
    this.bubbles = [];
    this.ship = [];
    this.score = 0;
    this.level = 0;

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

  addBubbles(num, vel=0.1) {
    this.level++;
    num = num || Game.NUM_BUBBLES;

    for (let i = 0; i < num; i++) {
      this.add(new Bubbles({ game: this, vel: Util.randomVec(vel)}));
    }
  }

  addShip() {
    const ship = new Ship({
      pos: [(Game.DIM_X/2), (Game.DIM_Y/2)],
      game: this
    });

    this.add(ship);

    return ship;
  }

  allObjects() {
    if(this.bubbles.length < 2){
      this.addBubbles(40, (this.level*0.1));
      this.ship[0].radius = 15;
    }
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
    $('.level').html(`Level: ${this.level}`)

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

    let pos_x = Game.DIM_X * Math.random()
    let pos_y = Game.DIM_Y * Math.random()

    if (this.ship){
      let pos = [(Game.DIM_X/2),(Game.DIM_Y/2)];

      if(this.ship[0]){
        pos = this.ship[0].pos
      }

      console.log(pos);

      while(pos_x > (pos[0] - 50) && pos_x < (pos[0]+50)){
        pos_x = Game.DIM_X * Math.random();
      }

      while(pos_y > (pos[1]) - 50 && pos_y < (pos[1])+50){
        pos_y = Game.DIM_Y * Math.random();
      }
    }

    return [
      pos_x,
      pos_y
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
