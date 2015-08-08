(function(global) {
  'use strict'

  var Map = function(options) {
    this.tileHeight = options.tileHeight || 32
    this.tileWidth = options.tileWidth || 32
    this.rows = options.rows
    this.cols = options.cols
    this.el = options.el
    this.tiles = Object.create(null)

    var start = (this.rows - 1) / 2 * -1
    var stop = (this.rows - 1) / 2
    while (start !== stop + 1) {
      this.tiles[start++] = Object.create(null)
    }
  }

  Map.prototype.draw = function() {
    this.el.style.width = (this.rows * this.tileHeight) + 'px'
    this.el.style.height = (this.cols * this.tileWidth) + 'px'

    var col = 0
    var row = 0
    var x = (this.rows - 1) / 2 * -1
    var y = (this.cols - 1) / 2 * -1

    var fragment = document.createDocumentFragment()

    for (var i = 0; i < this.rows * this.cols; i++) {
      var div = document.createElement('div')
      div.classList.add('tile')
      div.dataset.x = x
      div.dataset.y = y
      div.dataset.col = col
      div.dataset.row = row
      this.tiles[x][y] = {el: div}
      fragment.appendChild(div)

      x++
      col++

      //next row
      if (col === this.cols) {
        x = (this.rows - 1) / 2 * -1
        col = 0
        row++
        y++
      }
    }

    this.el.appendChild(fragment)
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

  Map.prototype.fill = function(tiles) {
    var self = this
    tiles.forEach(function(dtile) {
      var tile = self.getTileAt(dtile[0], dtile[1])
      tile.layers = Object.create(null)
      var dlayers = dtile[2]

      var options = dtile[3]
      tile.walk = options.walk !== false
      tile.jump = options.jump !== false

      for (var i in dlayers) {
        var layer = Object.create(null)
        layer.tile = tile
        var dlayer = dlayers[i]
        var z = +i
        layer.z = z
        var col = dlayer[0]
        layer.col = col
        var row = dlayer[1]
        layer.row = row
        var behavior = dlayer[2]
        if (behavior === 'hover')
          layer.hover = true

        // tile.tilesetCol = col
        // tile.tilesetRow = row
        var el = document.createElement('div')
        el.classList.add('layer')
        layer.el = el
        if (layer.hover)
          el.classList.add('hover')
        el.style.backgroundPositionX = '-' + col * 32 + 'px'
        el.style.backgroundPositionY = '-' + row * 32 + 'px'
        tile.el.appendChild(el)
      }
    })
  }

  Map.prototype.getTileAt = function(x, y) {
    return this.tiles[x][y]
  }

  Map.prototype.getTilePosition = function(x, y) {
    var col = this.xToCol(x)
    var row = this.yToRow(y)

    var left = col * this.tileWidth
    var top = row * this.tileHeight
    return {left: left, top: top}
  }

  Map.prototype.canMoveTo = function(x, y) {
    var tile = this.getTileAt(x, y)
    if (tile.walk === false)
      return false
    return true
  }

  global.RPG.Map = Map
}(this))
