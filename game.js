import Board from './board.js'
import createPieces from './pieces/create_pieces.js'
import shuffle from 'lodash/shuffle'

class Game{

  constructor(options){
    this.board = new Board()
    this.ctx = options.ctx
    this.availablePieces = []
  }

  play(){
    this.introducePiece();
    this.board.animate()
    // setTimeout(() => {
    //   this.introducePiece();
    // }, 500)
  }

  introducePiece(){
    if(!this.board.activePiece){
      this.availablePieces.length === 0
        ? this.createPiece()
        : null
      this.board.introducePiece(this.randomPiece())
    }
  }

  setup(){
    this.createPieces()
    this.board.handleKeyClicks()
    this.board.animate()
  }

  randomPiece(){
    const randomEl = this.availablePieces[0]
    this.availablePieces.splice(0, 1)
    return randomEl
  }

  createPieces(){
    for(let i = 0; i < 4; i++){
      createPieces.forEach((pieceConstructor) => {
        const piece = pieceConstructor(this.ctx)
        piece.board = this.board
        this.availablePieces.push(piece)
      })
    }
    this.availablePieces = shuffle(this.availablePieces)
  }
}

export default Game