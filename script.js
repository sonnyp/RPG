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

  var tiles = [
    [5, 5, {
      0: [6, 3],
    }, {walk: false}],
    [2, 2, {
      0: [5, 33],
    }, {walk: false}],
    [2, 1, {
      0: [5, 32, 'hover'],
    }, {walk: true}],
    [-4, 2, {
      0: [5, 33],
    }, {walk: false}],
    [-4, 1, {
      0: [5, 32, 'hover'],
    }, {walk: true}],
  ]

  map.fill(tiles)

  var player = global.RPG.player = new global.RPG.Player({
    el: document.getElementById('player'),
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    map: map,
  })

  var dirKeys = {
    'up': [
      'w',
      'up',
      'k',
    ],
    'down': [
      's',
      'down',
      'j',
    ],
    'left': [
      'a',
      'left',
      'h',
    ],
    'right': [
      'd',
      'right',
      'l',
    ],
    'jump': [
      'space',
    ],
  }

  var listener = new window.keypress.Listener()

  Object.keys(dirKeys).forEach(function(dir) {
    dirKeys[dir].forEach(function(key) {
      listener.simple_combo(key, function() {
        player[dir]()
      })
    })
  })

  // listener.simple_combo("w", function() {
  //   player.walkUp()
  // })
  // Mousetrap.bind('down', function() {
  //   player.walkDown()
  // })

  // Mousetrap.bind('up', function() {
  //   player.walkUp()
  // })
  // Mousetrap.bind('left', function() {
  //   player.walkLeft()
  // })
  // Mousetrap.bind('right', function() {
  //   player.walkRight()
  // })
  // Mousetrap.bind('space', function() {
  //   player.jump()
  // })
}(this))
