(function(global) {
  'use strict'

  var Player = function(options) {
    this.x = options.x
    this.y = options.y
    this.width = options.width
    this.height = options.height
    this.realWidth = options.width
    this.realHeight = options.height
    this.map = options.map
    this.el = options.el
    var el = this.el = options.el
    this.move(this.x, this.y)
    this.spriteRows = 4
    this.spriteRow = 0
    this.spriteCols = 4
    this.spriteCol = 0
    this.direction = 'down'
    this.jumping = false
    this.faceDown()
  }

  /*
   * sprite
   */
  Player.prototype.setSpriteRow = function(row) {
    this.setSpritePosition(this.spriteCol, row)
  }
  Player.prototype.setSpriteCol = function(col) {
    this.setSpritePosition(col, this.spriteRow)
  }
  Player.prototype.setSpritePosition = function(col, row) {
    this.spriteCol = col
    this.spriteRow = row
    this.el.style.backgroundPosition = [
      '-' + (col * this.width) + 'px',
      '-' + (row * this.height) + 'px',
    ].join(' ')
  }

  Player.prototype.step = function() {
    var col = this.spriteCol + 1
    if (col === this.spriteCols)
      col = 0
    this.setSpriteCol(col)
  }

  // FIME
  Player.prototype.turn = function() {
    var row = this.spriteRow + 1
    if (row === this.spriteRows)
      row = 0
    this.setSpriteRow(row)
  }

  // Player.prototype.setSpriteStep = function(n) {
  //   this.style['background-position'] =
  // }

  Player.prototype.move = function(x, y) {
    x = typeof x === 'number' ? x : this.x
    y = typeof y === 'number' ? y : this.y
    if (!this.canMoveTo(x, y))
      return

    this.x = x
    this.y = y
    this.el.dataset.x = this.x
    this.el.dataset.y = this.y

    var pos = this.map.getTilePosition(this.x, this.y)

    var top = pos.top  - (this.height - this.map.tileHeight)
    var left = pos.left - (this.width - this.map.tileWidth)
    this.el.style.top = top + 'px'
    this.el.style.left = left + 'px'
  }

  Player.prototype.startAnimation = function() {
    this.el.classList.add('animate')
  }

  Player.prototype.scale = function(factor) {
    var height = this.height * factor
    var diff = height - this.height
    var offset = diff / 2
    var margin = diff
    move(this.el)
      .scale(factor)
      .translateY(offset / factor * -1)
      .end()
    this.realHeight = height
    this.realWidth = this.width * factor
    // this.height = height
  }

  Player.prototype.stopAnimation = function() {
    this.el.classList.remove('animate')
  }

  Player.prototype.jump = function() {
    if (this.jumping === true)
      return

    this.jumping = true
    var height = this.map.tileHeight
    var self = this
    move(this.el)
      .y(height * -1)
      .duration('.3s')
      .ease('ease-in')
      .then()
        .y(height)
        .ease('ease-in')
        .duration('.3s')
        .pop()
      .end(function() {
        self.jumping = false
      })
  }

  // Player.prototype.test = function() {

  //   // var that = this
  //   // this.startAnimation()
  //   // move(this.el)
  //   //   .set('left', left)
  //   //   // .set('left', left)
  //   //   .duration('.3s')
  //   //   .ease('linear')
  //   //   .then(function() {
  //   //     that.stopAnimation()
  //   //   })
  //   //   .end()
  //   // var start = null;
  //   // var el = this.el

  //   // function step(timestamp) {
  //   //   if (!start) start = timestamp
  //   //   var progress = timestamp - start
  //   //   el.style.left = Math.min(progress/10, 200) + "px"
  //   //   if (progress < 2000) {
  //   //     window.requestAnimationFrame(step)
  //   //   }
  //   // }

  //   // window.requestAnimationFrame(step)
  // }

  Player.prototype.canMoveTo = function(x, y) {
    var col = this.map.xToCol(x)
    var row = this.map.yToRow(y)

    //off map
    if (row < 0 || col < 0)
      return false

    // off map
    if (row === this.map.rows || col === this.map.cols)
      return false

    // first row
    if (row === 0 && this.realHeight > this.map.tileHeight)
      return false

    // first and last cols
    if ((col === 0 || col === this.map.cols - 1) && this.realWidth > this.map.tileWidth)
      return false

    if (this.jumping)
      return true

    if (!this.map.canMoveTo(x, y))
      return false

    return true
  }

  Player.prototype.teleport = function(x, y) {
    var self = this
    this.test(8, 50, function() {
      self.move(x, y)
      self.test(8, 50)
    })
    // this.move(x, y)
    // this.test(8, 250)
  }

  Player.prototype.test = function(step, interval, fn) {
    var that = this
    var step = step
    var c = 0
    var inter = setInterval(function() {
      that.rotateCW()
      if (++c === step) {
        clearInterval(inter)
        if (fn) fn()
      }
    }, interval)
  }

  Player.prototype.rotateCW = function() {
    if (this.direction === 'down')
      this.faceLeft()
    else if (this.direction === 'right')
      this.faceDown()
    else if (this.direction === 'up')
      this.faceRight()
    else if (this.direction === 'left')
      this.faceUp()
  }
  Player.prototype.rotateClockWise = Player.prototype.rotateCW

  Player.prototype.rotateCCW = function() {
    if (this.direction === 'down')
      this.faceRight()
    else if (this.direction === 'right')
      this.faceUp()
    else if (this.direction === 'up')
      this.faceLeft()
    else if (this.direction === 'left')
      this.faceDown ()
  }
  Player.prototype.rotateACW = Player.prototype.CCW
  Player.prototype.rotateAntiClockWise = Player.prototype.rotateCCW
  Player.prototype.rotateCounterClockWise = Player.prototype.rotateCCW

  Player.prototype.walk = function(dir) {
    if (this.walking)
      this.stop()

    this.walking = true
    var Dir = (dir.substring(0, 1).toUpperCase() + dir.substr(1))
    if (this.direction !== 'dir')
      this['face' + Dir]()
    var self = this
    this.walkingInterval = setInterval(function() {
      self['move' + Dir]()
    }, 75)
    this.el.classList.add('animate')
  }

  Player.prototype.do = function(action) {
    var fn
    if (['left', 'right', 'up', 'down'].indexOf(action) !== -1) {
      fn = this.walk.bind(this, action)
    }
    else {
      fn = this[action]
    }

    if (!fn)
      throw Error('No idea what is ' + action)

    var args = Array.prototype.slice.call(arguments)
    args.splice(0, 1)
    fn.apply(this, args)
  }

  Player.prototype.upLeft = function() {
    this.faceUp()
    this.move(this.x - 1, this.y - 1)
  }

  Player.prototype.upRight = function() {
    this.faceUp()
    this.move(this.x + 1, this.y - 1)
  }

  Player.prototype.downLeft = function() {
    this.faceDown()
    this.move(this.x - 1, this.y + 1)
  }

  Player.prototype.downRight = function() {
    this.faceDown()
    this.move(this.x + 1, this.y + 1)
  }

  Player.prototype.stop = function() {
    this.walking = false
    this.el.classList.remove('animate')
    clearInterval(this.walkingInterval)
  }

  /*
   * down
   */
  Player.prototype.down = function() {
    if (this.direction !== 'down') {
      this.faceDown()
    }
    else {
      this.walkDown()
    }
  }
  Player.prototype.moveDown = function() {
    this.move(undefined, this.y + 1)
  }
  Player.prototype.faceDown = function() {
    if (this.direction === 'down')
      return
    this.direction = 'down'
    this.setSpritePosition(0, 0)
    this.el.dataset.dir = 'down'
  }
  Player.prototype.walkDown = function() {
    if (this.walking)
      this.stop()
    this.faceDown()
    this.el.classList.add('animate')
    this.moveDown()
  }

  /*
   * up
   */
  Player.prototype.up = function() {
    if (this.direction !== 'up') {
      this.faceUp()
    }
    else {
      this.walkUp()
    }
  }
  Player.prototype.moveUp = function() {
    this.move(undefined, this.y - 1)
  }
  Player.prototype.faceUp = function() {
    if (this.direction === 'up')
      return
    this.direction = 'up'
    this.setSpritePosition(0, 3)
    this.el.dataset.dir = 'up'
  }
  Player.prototype.walkUp = function() {
    this.faceUp()
    this.el.classList.add('animate')
    this.moveUp()
  }

  /*
   * left
   */
  Player.prototype.left = function() {
    if (this.direction !== 'left') {
      this.faceLeft()
    }
    else {
      this.walkLeft()
    }
  }
  Player.prototype.moveLeft = function() {
    this.move(this.x - 1)
  }
  Player.prototype.faceLeft = function() {
    if (this.direction === 'left')
      return
    this.direction = 'left'
    this.setSpritePosition(0, 1)
    this.el.dataset.dir = 'left'
  }
  Player.prototype.walkLeft = function() {
    this.faceLeft()
    this.el.classList.add('animate')
    this.moveLeft()
  }

  /*
   * right
   */
  Player.prototype.right = function() {
    if (this.direction !== 'right') {
      this.faceRight()
    }
    else {
      this.walkRight()
    }
  }
  Player.prototype.moveRight = function() {
    this.move(this.x + 1)
  }
  Player.prototype.faceRight = function() {
    if (this.direction === 'right')
      return
    this.direction = 'right'
    this.setSpritePosition(0, 2)
    this.el.dataset.dir = 'right'
  }
  Player.prototype.walkRight = function() {
    this.faceRight()
    this.el.classList.add('animate')
    this.moveRight()
  }

  global.RPG.Player = Player
}(this))
