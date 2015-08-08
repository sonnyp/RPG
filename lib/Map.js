(function(global) {
  'use strict'

  var Map = function(options) {
    this.tileHeight = options.tileHeight || 32
    this.tileWidth = options.tileWidth || 32
    this.rows = options.rows
    this.cols = options.cols
    this.el = options.el
  }

  Map.prototype.draw = function() {
    this.el.style.width = (this.rows * this.tileHeight) + 'px'
    this.el.style.height = (this.cols * this.tileWidth) + 'px'

    var col = 0
    var row = 0
    var x = (this.rows - 1) / 2 * -1
    var y = (this.cols - 1) / 2 * -1

    for (var i = 0; i < this.rows * this.cols; i++) {
      var div = document.createElement('div')
      div.classList.add('tile')
      div.dataset.x = x
      div.dataset.y = y
      div.dataset.col = col
      div.dataset.row = row

      x++
      col++

      //next row
      if (col === this.cols) {
        x = (this.rows - 1) / 2 * -1
        col = 0
        row++
        y++
      }

      this.el.appendChild(div)
    }
  }

  Map.prototype.colToX = function(col) {
    return (((this.cols - 1) / 2) * -1) + col
  }

  Map.prototype.rowToY = function(row) {
    return (((this.rows - 1) / 2) * -1) + row
  }

  Map.prototype.xToCol = function(x) {
    return x + ((this.rows - 1) / 2)
  }

  Map.prototype.yToRow = function(y) {
    return y + ((this.cols - 1) / 2)
  }

  Map.prototype.getTilePosition = function(x, y) {
    var col = this.xToCol(x)
    var row = this.yToRow(y)

    var left = col * this.tileWidth
    var top = row * this.tileHeight
    return {left: left, top: top}
    // lol
    // var el = document.querySelector('[data-x="' + x + '"][data-y="'+ y + '"]')
    // var col = +el.dataset.col
    // var row = +el.dataset.row
    // var left = col * this.tileWidth
    // var top = row * this.tileHeight

    // return {top: this.getCol, left: left}
  }

  global.RPG.Map = Map
}(this))
