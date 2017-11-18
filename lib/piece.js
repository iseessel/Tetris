import Square from './squares/square.js'
import AnchorSquare from './squares/anchor_square.js'

class Piece{

  constructor(options){
    this.anchorSquare = options.anchorSquare
    this.src = options.src
    this.rotations = options.rotations
    this.currentRotationIdx = options.currentRotationIdx
    this.color = options.color
    this.vel = options.vel
  }

  squares(){
    let squares = []
    this.rotations.forEach((rotation) => {
      squares = squares.concat(rotation)
    })
    return squares
  }

  dupPiece(){
    // return JSON.parse(JSON.stringify())
    // const piece = new Piece({rotations: this.rotations, currentRotationIdx: 0,
    //     vel: 500, anchorSquare: new AnchorSquare({center: [2, 2]}),
    //     color: "#FA980B"})
    // piece.rotations.forEach((rotation) =>{
    //   rotation.forEach((square) => {
    //     square.anchorSquare = piece.anchorSquare
    //   })
    // })
    //
    return piece;
  }

  each(callback, args){
    this.currentRotation().forEach((square) => {
      callback.apply(square, args)
    })
  }

  currentRotation(){
    return this.rotations[this.currentRotationIdx]
  }

  draw(){
    this.each(Square.prototype.draw, [this.color])
  }

  clearRect(){
    this.each((Square.prototype.clearRect))
  }

  rotate(){
    this.currentRotationIdx = (this.currentRotationIdx + 1) %
      this.rotations.length
  }

  fallDown(){
    this.clearRect()
    if(!this.atBottom() &&
    !this.board.activePieceCollide("down")){
      this.anchorSquare.fallDown()
      this.each(() => {
        this.draw()
      })
      }else{
      this.draw()
    }
  }

  handleLeftKeyPress(){
    this.clearRect()
    this.anchorSquare.moveLeft()
    if(this.inBounds() && !this.board.activePieceCollide()){
      this.each(() => {
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
    if(this.inBounds() && !this.board.activePieceCollide()){
      this.each(() => {
        this.draw()
      })
    }else{
      this.anchorSquare.moveLeft()
      this.draw()
    }
  }

  unRotate(){
    this.currentRotationIdx = (this.currentRotationIdx
      + this.rotations.length - 1) %
      this.rotations.length
  }

  handleUpKeyPress(){
    this.clearRect()
    this.rotate()
    if(this.inBounds() && !this.board.activePieceCollide()){
      this.each(() => {
        this.draw()
      })
    }else{
      this.wallKick() ? null : this.unRotate()
    }
    this.each(() => {
      this.draw()
    })
  }

  wallKick(){
    //Naively search for a position to move to; if are available on one side,
    //try the other side -- otherwise give up and return to original position.
    //NB: This naive way results in fewer computations than checking which side a collision is on.
    for(let i = 0; i < 2; i ++){
      if (this.positionAvailable()){
        this.anchorSquare.moveLeft()
      }else {
        return true
      }
    }

    for(let j = 0; j < 4; j++){
      if(this.positionAvailable()){
        this.anchorSquare.moveRight()
      }else {
        return true
      }
    }

    for(let q = 0; q < 2; q++){
      this.anchorSquare.moveLeft()
    }

    return false
  }

  positionAvailable(){
    return !this.inBounds() || this.board.activePieceCollide()
  }

  atBottom(){
    return this.currentRotation().some((square) => {
      return square.atBottom()
    })
  }

  inBounds(){
    return this.currentRotation().every((square) => {
      return square.inBounds()
    })
  }

}

export default Piece
