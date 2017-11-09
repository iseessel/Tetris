const _defaultPieces = []
import nullSquareInstance from './squares/null_square.js'
import Piece from './piece.js'
import Square from './squares/square.js'

class Board{

  constructor(){
    this.grid = []
    this.pieces = []
    this.activePiece = null
    this.createNullBoard()
  }

  animate(){
    this.activePiece.draw(this.color)
    return window.setInterval(() => {
      this.activePiece.clearRect()
      this.activePiece.fallDown()
      this.activePiece.draw()
    }, 500)
  }

  createNullBoard(){
    for(let i = 0; i < 40; i++){
      const row = []
      for(let j = 0; j < 20; j++){
        row.push(nullSquareInstance)
      }
      this.grid.push(row)
    }
  }

  introducePiece(piece){
    this.pieces.push(piece)
    this.activePiece = piece
    piece.currentRotation().forEach((square) => {
      if(square instanceof Square){
        const squarePositionY = square.pos()[0]
        const squarePositionX = square.pos()[1]
        this.grid[squarePositionY][squarePositionX] = square
      }
    })
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

        break
        case 40:
        this.activePiece ? this.activePiece.fallDown() : null
          break
      }
    })
  }



}

export default Board
