const _defaultPieces = []
import nullSquareInstance from './squares/null_square.js'
import Piece from './piece.js'
import Square from './squares/square.js'

class Board{

  constructor(options){
    this.game = options.game
    this.grid = []
    this.pieces = []
    this.activePiece = null
    this.createNullBoard()
  }

  animate(){
    this.activePiece.draw()
    return window.setInterval(() => {
      this.activePiece.clearRect()
      this.activePiece.fallDown()
      if(this.squareMustStop()){
        // So that when the piece hits the bottom
        // it doesn't instantly become inactive.
        setTimeout(() => {
          if(this.squareMustStop()){
            this.stopSquare()
            this.activePiece.draw()
          }
        }, 300)
      }
      this.activePiece.draw()
    }, 500)
  }

  squareMustStop(){
    return this.activePieceAtBottom() ||
      this.activePieceCollide("down")
  }

  stopSquare(){
    this.cementActivePieceOnGrid()
    this.activePiece = null
    this.game.introducePiece()
  }

  cementActivePieceOnGrid(){
    this.activePiece.currentRotation().forEach((square) => {
      const position = square.pos();
      this.grid[position[1]][position[0]] = square
    })
  }

  activePieceCollide(direction){
    return this.activePiece.currentRotation().some((square) => {
      const position = square.pos()
      let posX = position[1]
      let posY = position[0]
      switch(direction){
        case("down"):
          posX += 1
          break;
      }
      return !(this.grid[posX][posY] ==
        nullSquareInstance)
    })
  }

  activePieceAtBottom(){
    return this.activePiece.atBottom()
  }

  activePieceInBounds(){
    return this.activePiece.inBounds()
  }

  createNullBoard(){
    for(let i = 0; i < 20; i++){
      const row = []
      for(let j = 0; j < 10; j++){
        row.push(nullSquareInstance)
      }
      this.grid.push(row)
    }
  }

  introducePiece(piece){
    this.pieces.push(piece)
    this.activePiece = piece
  }

  handleKeyClicks(){
    this.handleKeyPress = window.addEventListener("keydown", (e) => {
      switch(e.keyCode){
        case 37:
          this.activePiece ? this.activePiece.handleLeftKeyPress() : null
          break

        case 38:
          this.activePiece ? this.activePiece.handleUpKeyPress() : null
          break

        case 39:
          this.activePiece ? this.activePiece.handleRightKeyPress() : null
          break

        case 40:
          this.activePiece ? this.activePiece.fallDown() : null
          break
      }
    })
  }
}

export default Board
