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

	const Bubble = __webpack_require__(1);
	
	
	document.addEventListener('DOMContentLoaded', () => {
	  const canvas = document.getElementById('myCanvas');
	  const ctx = canvas.getContext('2d');
	
	
	  var raf;
	  let array = [];
	
	  const hexDigits = "0123456789ABCDEF";
	
	  let num = 0;
	  let max = 30;
	  let min = 5;
	
	  while (num < 20) {
	
	    let color = "#";
	
	    for (let i = 0; i < 3; i ++) {
	      color += hexDigits[Math.floor((Math.random() * 16))];
	    }
	
	
	    let radius = (Math.random() * (max-min)) + min
	    let x = Math.floor(Math.random() * canvas.width);
	    let y = Math.floor(Math.random() * canvas.height);
	
	    let copy = new Bubble(x, y, radius, color, ctx);
	
	    array.push(copy);
	    num++;
	  }
	
	  const draw = () => {
	    ctx.clearRect(0,0, canvas.width, canvas.height);
	
	    array.forEach((bubble,idx1) => {
	
	      bubble.x += bubble.vx;
	      bubble.y += bubble.vy;
	
	      if (bubble.y + bubble.vy > canvas.height || bubble.y + bubble.vy < 0) {
	        bubble.vy = -bubble.vy;
	      }
	      if (bubble.x + bubble.vx > canvas.width || bubble.x + bubble.vx < 0) {
	        bubble.vx = -bubble.vx;
	      }
	
	      bubble.draw();
	
	      array.forEach((otherBubble,idx2) => {
	        let dx = (bubble.x + bubble.radius) - (otherBubble.x + otherBubble.radius);
	        let dy = (bubble.y + bubble.radius) - (otherBubble.y + otherBubble.radius);
	        let distance = Math.sqrt((dx * dx) + (dy * dy));
	
	        if (distance <= (bubble.radius + otherBubble.radius)){
	          bubble.vx = -bubble.vx;
	          otherBubble.vx = -otherBubble.vx;
	
	          // bubble.vy = -bubble.vy;
	          // otherBubble.vy = -otherBubble.vy;
	        }
	      });
	    });
	
	    raf = window.requestAnimationFrame(draw);
	  }
	
	  draw();
	
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Bubble {
	  constructor(x,y,radius,color, ctx){
	
	    let plusOrMinus = Math.random() < 0.5 ? 1 : -1;
	
	    this.x = x;
	    this.y = y;
	    this.radius = radius;
	    this.color = color;
	    this.vx = 0.5 * plusOrMinus;
	    this.vy = 0.5 * plusOrMinus;
	    this.ctx = ctx;
	  };
	
	  draw(){
	    this.ctx.beginPath();
	    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    this.ctx.closePath();
	    this.ctx.fillStyle = this.color;
	    this.ctx.shadowColor = this.color;
	    this.ctx.shadowBlur = this.radius-5;
	    this.ctx.fill();
	  };
	}
	
	module.exports = Bubble;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map