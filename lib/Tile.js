'use strict'

var Tile = function() {
  this.layers = []
  this.el = null
}

Tile.prototype.build = function() {
  this.el = document.createElement('div')
}
