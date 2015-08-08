(function(global) {
  'use strict'

  var World = function(options) {
    this.rows = options.rows
    this.cols = options.cols
    this.el = options.el
  }

  World.prototype.draw = function() {
    for (var i = 0; i < rows * cols; i++) {
      var div = document.createElement('div')
      div.classList.add('tile')
      // div.onmouseover = function() {
      //   if (!selected)
      //     return
      //   this.setAttribute(
      //     'style',
      //     'background-position: ' + (selected.x * -1) + 'px ' + (selected.y * -1) + 'px;'
      //   )
      // }

      this.el.appendChild(div)
    }
  }

  global.RPG.World = World
}(this))
