const View = require('./ttt-view.js')// require appropriate file
const Game = require('./game.js')// require appropriate file

$( () => {
  // Your code here
  let game = new Game();
  let $something = $('.ttt');
  let view = new View(game, $something);
});
