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
      0: [26, 39],
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

    [-4, -5, {
      0: [9, 10 ],
    }, {walk: false, jump: true}],
    [-4, -4, {
      0: [9, 11],
    }, {walk: false, jump: true}],

    [-2, -1, {
      0: [13, 48, 'hover'],
    }, {walk: true, jump: true}],
    [-1, -1, {
      0: [14, 48, 'hover'],
    }, {walk: true, jump: true}],
    [0, -1, {
      0: [15, 48, 'hover'],
    }, {walk: true, jump: true}],

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

  var actions = {
    'up': {
      keys: ['w', 'up', 'k'],
    },
    'down': {
      keys: ['s', 'down', 'j'],
    },
    'left': {
      keys: ['a', 'left', 'h'],
    },
    'right': {
      keys: ['d', 'right', 'l'],
    },
    'jump': {
      keys: ['space'],
    },
  }
  var listener = new window.keypress.Listener()
  var currentAction
  Object.keys(actions).forEach(function(name) {
    var action = actions[name]
    action.keys.forEach(function(key) {
      listener.register_combo({
        keys: key,
        prevent_repeat: true,
        on_keydown: function() {
          currentAction = name
          player.do(name)
        },
        on_keyup: function() {
          if (currentAction === name)
            player.do('stop')
        },
      })
    })
  })
}(this))
