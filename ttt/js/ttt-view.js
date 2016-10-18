class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    // let $squares = $('li')
    $('li').on("click", (e) => {
      let $sq = $(e.currentTarget);
      this.makeMove($sq)
    });
  }

  makeMove($square) {
    let pos = $square.attr("data-pos")
    let pos_i = [parseInt(pos[0]), parseInt(pos[2])]
    try {
      this.game.playMove(pos_i)
    }
    catch (e) {
      alert("invalid move")
    }
    $square.text(this.game.board.grid[pos_i[0]][pos_i[1]])
    $square.css("background-color","white")
    if (this.game.winner()) {
      alert(`${this.game.winner()} wins`)
    }
  }

  setupBoard() {
    let $ul = $("<ul></ul>");
    for (var i = 0; i < 9; i++) {
      let rowIdx = Math.floor(i/3)
      let colIdx = i % 3
      let $li = $("<li></li>").attr("data-pos", [rowIdx, colIdx]);
      $ul.append($li)
    }
    this.$el.append($ul)
  }
}

module.exports = View;
