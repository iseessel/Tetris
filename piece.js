import Square from './squares/square.js'

class Piece{

  constructor(options){
    this.anchorSquare = options.anchorSquare
    this.rotations = options.rotations
    this.currentRotationIdx = options.currentRotationIdx
    this.color = options.color
    this.vel = options.vel
  }
  currentRotation(){
    return this.rotations[this.currentRotationIdx]
  }

  animate(){
    this.draw(this.color)
    return window.setInterval(() => {
      this.clearRect()
      this.fallDown()
      this.draw()
    }, 500)
  }

  draw(){
    this.each(Square.prototype.draw, [this.color])
  }

  clearRect(){
    this.each((Square.prototype.clearRect))
  }

  fallDown(){
    this.clearRect()
    this.anchorSquare.fallDown()
    if(this.inBounds()){
      this.each(function(){
        this.draw()})
    }else{
      this.anchorSquare.position[1] -= 1
      this.board.activePiece = null
      this.draw()
    }
  }

  handleLeftKeyPress(){
    this.clearRect()
    this.anchorSquare.moveLeft()
    if(this.inBounds()){
      this.each(function(){
        this.draw()
      })
    }else{
      this.anchorSquare.moveRight()
      this.draw()
    }
  }

  handleRightKeyPress(){
    this.clearRect()
    this.anchorSquare.moveRight()
    if(this.inBounds()){
      this.each(function(){
        this.draw()
      })
    }else{
      this.anchorSquare.moveLeft()
      this.draw()
    }
  }

  rotate(){
    this.currentRotationIdx = (this.currentRotationIdx + 1) %
      this.rotations.length
  }

  handleUpKeyPress(){
    this.clearRect()
    this.rotate()
    if(this.inBounds()){
      this.each(function(){
        this.draw()
      })
    }else{
      while(!this.inBounds()){
        this.anchorSquare.pos()[0] > 5 ? this.anchorSquare.moveLeft()
          : this.anchorSquare.moveRight()
      }
      this.each(function(){
        this.draw()
      })
    }
  }

  each(callback, args){
    this.currentRotation().forEach((square) => {
      square instanceof Square ? callback.apply(square, args) : null
    })
  }

  inBounds(){
    return this.currentRotation().every((square) => {
      return square.inBounds()
    })
  }

}

export default Piece
