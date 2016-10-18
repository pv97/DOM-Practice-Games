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
