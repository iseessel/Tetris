import Board from './board.js'
import createPieces from './pieces/create_pieces.js'
import shuffle from 'lodash/shuffle'

const _levelVelocities = [
  750, 650, 550, 500, 450, 400, 350, 325, 300,
  250, 225, 200, 175, 150, 140, 130, 120, 110
]

class Game{

  constructor(options){
    this.board = new Board({
      game: this,
      gameCtx: options.gameCtx, velocity: _levelVelocities[0]
    })
    this.level = 0
    this.linesCleared = 0
    this.gameCtx = options.gameCtx
    this.availablePieces = []
  }

  levelUp(){
    if(this.linesCleared % 10 === 0 & this.linesCleared != 0){
      this.level += 1
      this.board.velocity = _levelVelocities[this.level]
      clearInterval(this.board.animationId)
      this.board.animate()
    }
  }

  play(){
    this.createPieces()
    this.board.handleKeyClicks()
    this.introducePiece();
    this.board.animate()
  }

  introducePiece(){
    this.availablePieces.length === 0
        ? this.createPieces()
        : null
    this.board.introducePiece(this.randomPiece())
  }

  randomPiece(){
    const randomPiece = this.availablePieces[0]
    this.availablePieces.splice(0, 1)
    return randomPiece
  }

  createPieces(){
    for(let i = 0; i < 4; i++){
      createPieces.forEach((pieceConstructor) => {
        const piece = pieceConstructor(this.gameCtx)
        piece.board = this.board
        this.availablePieces.push(piece)
      })
    }
    this.availablePieces = shuffle(this.availablePieces)
  }
}

export default Game
