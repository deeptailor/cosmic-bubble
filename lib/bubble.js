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
