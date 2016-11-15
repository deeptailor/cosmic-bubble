const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

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
