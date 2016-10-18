/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiView = __webpack_require__(1)// require appropriate file
	const HanoiGame = __webpack_require__(2)// require appropriate file

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class View {
	  constructor(game, $el) {
	    this.game = game;
	    this.$el = $el;
	    this.setupTowers();
	    this.render()
	    this.bindEvents();
	    this.move = 'lol'
	  }

	  render(){
	    let $ul = $('ul')
	    $ul.remove();

	    let $ul1 = $("<ul></ul>").attr("tower-num", 0);
	    let $ul2 = $("<ul></ul>").attr("tower-num", 1);
	    let $ul3 = $("<ul></ul>").attr("tower-num", 2);

	    for (var i = 0; i < 3; i++) {

	      let $li1 = $("<li></li>")
	      let $li2 = $("<li></li>")
	      let $li3 = $("<li></li>")

	      if (this.game.towers[0][2-i]) {
	        $li1.addClass(`disk-${this.game.towers[0][2-i]}`)
	      }
	      if (this.game.towers[1][2-i]) {
	        $li2.addClass(`disk-${this.game.towers[1][2-i]}`)
	      }
	      if (this.game.towers[2][2-i]) {
	        $li3.addClass(`disk-${this.game.towers[2][2-i]}`)
	      }

	      $ul1.append($li1)
	      $ul2.append($li2)
	      $ul3.append($li3)
	    }
	    this.$el.append($ul1)
	    this.$el.append($ul2)
	    this.$el.append($ul3)
	  }

	  bindEvents() {
	    $('ul').on("click", (e) => {
	      let $sq = $(e.currentTarget);
	      if (this.move !='lol'){
	        if (!this.game.isValidMove(this.move, parseInt($sq.attr("tower-num")))) {
	          alert("invalid move")
	        }
	        this.game.move(this.move, parseInt($sq.attr("tower-num")))
	        this.move = 'lol'
	        console.log('second');
	      } else {
	        this.move = parseInt($sq.attr("tower-num"))
	        console.log(this.move);
	      }
	      this.render()
	      if (this.game.isWon()) {
	        alert("you win!>!I#JR@()")
	      }
	      this.bindEvents()
	    });
	  }

	  setupTowers() {
	    let $ul = $("<ul></ul>").attr("tower-num", 0);
	    let $ul2 = $("<ul></ul>").attr("tower-num", 1);
	    let $ul3 = $("<ul></ul>").attr("tower-num", 2);

	    for (var i = 0; i < 3; i++) {
	      let $li = $("<li></li>").addClass(`disk-${i+1}`)
	      let $li2 = $("<li></li>")
	      let $li3 = $("<li></li>")
	      $ul.append($li)
	      $ul2.append($li2)
	      $ul3.append($li3)
	    }
	    this.$el.append($ul)
	    this.$el.append($ul2)
	    this.$el.append($ul2)

	  }
	}

	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2,1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ }
/******/ ]);