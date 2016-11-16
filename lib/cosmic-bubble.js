const Game = require('./game.js');
const GameView = require('./game_view.js');
const $ = require('jquery');

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  $('.restart').click(() => window.location.reload());


  const game = new Game();

  new GameView(game, ctx).start();
});
