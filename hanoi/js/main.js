const HanoiView = require('./view.js')// require appropriate file
const HanoiGame = require('./game.js')// require appropriate file

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});
