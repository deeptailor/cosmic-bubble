const Bubble = require('./bubble.js');


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
