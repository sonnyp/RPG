(function(global) {
  'use strict'

  var world = global.RPG.world = new global.RPG.World({
    el: document.getElementById('world'),
  })

  var map = global.RPG.map = new global.RPG.Map({
    rows: 15,
    cols: 15,
    el: document.getElementById('map'),
    world: world,
  })
  map.draw()

  var player = global.RPG.player = new global.RPG.Player({
    el: document.getElementById('player'),
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    map: map,
  })

  Mousetrap.bind('down', function() {
    player.walkDown()
  })
  Mousetrap.bind('up', function() {
    player.walkUp()
  })
  Mousetrap.bind('left', function() {
    player.walkLeft()
  })
  Mousetrap.bind('right', function() {
    player.walkRight()
  })
  Mousetrap.bind('space', function() {
    player.jump()
  })
}(this))
