class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.inPlay = true;
    this.ship = this.game.addShip();
  }

  bindKeyHandlers() {
   const ship = this.ship;

   Object.keys(GameView.MOVES).forEach((k) => {
     let move = GameView.MOVES[k];
     key(k, () => { ship.power(move); });
   });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  "w": [ 0, -0.5],
  "a": [-0.5,  0],
  "s": [ 0,  0.5],
  "d": [ 0.5,  0],
};

module.exports = GameView;
