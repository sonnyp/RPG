(function(global) {
  'use strict'

  var Player = function(options) {
    this.x = options.x
    this.y = options.y
    this.width = options.width
    this.height = options.height
    this.map = options.map
    this.el = options.el
    var el = this.el = options.el
    this.move(this.x, this.y)
    this.spriteRows = 4
    this.spriteRow = 0
    this.spriteCols = 4
    this.spriteCol = 0
    this.direction = 'down'
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
    if (!this.canMoveTo(x, y))
      return

    if (typeof x === 'number')
      this.x = x
    if (typeof y === 'number')
      this.y = y
    this.el.dataset.x = this.x
    this.el.dataset.y = this.y

    var pos = this.map.getTilePosition(this.x, this.y)

    var top = pos.top  - (this.height - this.map.tileHeight)
    var left = pos.left - (this.width - this.map.tileWidth)
    this.el.setAttribute('style', [
      'top: ' + top + 'px',
      'left: ' + left + 'px',
    ].join(';'))
  }

  Player.prototype.startAnimation = function() {
    this.el.classList.add('animate')
  }

  Player.prototype.stopAnimation = function() {
    this.el.classList.remove('animate')
  }

  Player.prototype.jump = function() {
    this.moveUp()
    var self = this
    setTimeout(function() {
      self.moveDown()
    }, 500)
  }

  Player.prototype.test = function() {

    // var that = this
    // this.startAnimation()
    // move(this.el)
    //   .set('left', left)
    //   // .set('left', left)
    //   .duration('.3s')
    //   .ease('linear')
    //   .then(function() {
    //     that.stopAnimation()
    //   })
    //   .end()
    // var start = null;
    // var el = this.el

    // function step(timestamp) {
    //   if (!start) start = timestamp
    //   var progress = timestamp - start
    //   el.style.left = Math.min(progress/10, 200) + "px"
    //   if (progress < 2000) {
    //     window.requestAnimationFrame(step)
    //   }
    // }

    // window.requestAnimationFrame(step)
  }

  Player.prototype.canMoveTo = function(x, y) {
    var col = this.map.xToCol(x)
    var row = this.map.yToRow(y)
    if (row < 0 || col < 0)
      return false
    if (row > this.map.rows - 1 || col > this.map.cols - 1)
      return false

    if (row === 0 && this.height > this.map.tileHeight)
      return false

    if (col === 0 && this.width > this.map.tileWidth)
      return false

    return true
  }

  /*
   * down
   */
  Player.prototype.moveDown = function() {
    this.move(undefined, this.y + 1)
  }
  Player.prototype.faceDown = function() {
    if (this.direction === 'down')
      return
    this.direction = 'down'
    this.el.dataset.dir = 'down'
  }
  Player.prototype.walkDown = function() {
    this.faceDown()
    this.el.classList.add('animate')
    this.moveDown()
  }

  /*
   * up
   */
  Player.prototype.moveUp = function() {
    this.move(undefined, this.y - 1)
  }
  Player.prototype.faceUp = function() {
    if (this.direction === 'up')
      return
    this.direction = 'up'
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
  Player.prototype.moveLeft = function() {
    this.move(this.x - 1)
  }

  Player.prototype.faceLeft = function() {
    if (this.direction === 'left')
      return
    this.direction = 'left'
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
  Player.prototype.moveRight = function() {
    this.move(this.x + 1)
  }
  Player.prototype.faceRight = function() {
    if (this.direction === 'right')
      return
    this.direction = 'right'
    this.el.dataset.dir = 'right'
  }
  Player.prototype.walkRight = function() {
    this.faceRight()
    this.el.classList.add('animate')
    this.moveRight()
  }

  global.RPG.Player = Player
}(this))
