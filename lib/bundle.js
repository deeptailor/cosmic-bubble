/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(5);
	
	
	document.addEventListener('DOMContentLoaded', () => {
	  const canvas = document.getElementById('myCanvas');
	  const ctx = canvas.getContext('2d');
	
	  canvas.width = Game.DIM_X;
	  canvas.height = Game.DIM_Y;
	
	  const game = new Game();
	
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Bubbles = __webpack_require__(2);
	const Ship = __webpack_require__(6);
	const Util = __webpack_require__(3)
	
	class Game {
	  constructor() {
	    this.bubbles = [];
	    this.ship = [];
	
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
	
	Game.BG_COLOR = "white";
	Game.DIM_X = window.innerWidth;
	Game.DIM_Y = window.innerHeight;
	Game.FPS = 30;
	Game.NUM_BUBBLES = 30;
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);
	
	const randomColor = () => {
	  const hexDigits = "0123456789ABCDEF";
	
	  let color = "#";
	  for (let i = 0; i < 3; i ++) {
	    color += hexDigits[Math.floor((Math.random() * 16))];
	  }
	
	  return color;
	}
	
	const randomRadius = (min, max) => {
	  return Math.floor((Math.random() * (max-min)) + min);
	}
	
	class Bubbles extends MovingObject {
	
	  constructor(options = {}) {
	      options.color = randomColor();
	      options.pos = options.pos || options.game.randomPosition();
	      options.radius = randomRadius(5,10);
	      options.vel = options.vel || Util.randomVec(0.1);
				super(options);
	  }
	
	  collideWith(otherObject) {
	    if (otherObject.radius < this.radius){
	      otherObject.remove();
	      this.radius += (0.2 * otherObject.radius);
	      return true;
	    }else if (otherObject.radius > this.radius){
	      this.remove();
	      otherObject.radius += (0.2 * this.radius)
	      return true;
	    }
	  }
	
	
	}
	
	module.exports = Bubbles;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util =  {
	
	  dir(vec){
	    const norm = Util.norm(vec);
	    return Util.scale(vec, 1/norm);
	  },
	
	  dist (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	
	  norm (vec) {
	    return Util.dist([0, 0], vec);
	  },
	
	  randomVec (length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },
	
	  wrap (coord, max) {
	    if (coord < 0) {
	      return max - (coord % max);
	    } else if (coord > max) {
	      return coord % max;
	    } else {
	      return coord;
	    }
	  }
	};
	
	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	
	class MovingObject {
	  constructor(options){
	    this.pos = options.pos;
	    this.vel = options.vel;
	    this.radius = options.radius;
	    this.color = options.color;
	    this.game = options.game;
	    this.isWrappable = true;
	  }
	
	  collideWith(otherObject) {
	    // default do nothing
	  }
	
	  draw(ctx){
	    ctx.fillStyle = this.color;
	    ctx.beginPath();
	    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
	
	    ctx.shadowColor = this.color;
	    ctx.shadowBlur = this.radius+30;
	    ctx.fill();
	  }
	
	  isCollidedWith(otherObject) {
	    const centerDist = Util.dist(this.pos, otherObject.pos);
	    return centerDist < (this.radius + otherObject.radius);
	  }
	
	  move(timeDelta) {
	    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
	        offsetX = this.vel[0] * velocityScale,
	        offsetY = this.vel[1] * velocityScale;
	
	    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
	
	    if (this.game.isOutOfBounds(this.pos)) {
	      if (this.isWrappable) {
	        this.pos = this.game.wrap(this.pos);
	      } else {
	        this.remove();
	      }
	    }
	  }
	
	  remove() {
	    this.game.remove(this);
	  }
	
	}
	
	const NORMAL_FRAME_TIME_DELTA = 1000/60;
	
	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(3);
	
	class Ship extends MovingObject {
	  constructor(options){
	    options.color = options.color || '#00ff1e';
	    options.radius = Ship.RADIUS;
	    options.vel = options.vel || [0,0];
	    super(options);
	  }
	
	  power(impulse) {
	    this.vel[0] += impulse[0];
	    this.vel[1] += impulse[1];
	  }
	
	  relocate() {
	    this.pos = this.game.randomPosition();
	    this.vel = [0, 0];
	  }
	
	}
	
	Ship.RADIUS = 15;
	module.exports = Ship;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map