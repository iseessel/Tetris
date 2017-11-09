import Board from './board.js'
import createPieces from './pieces/create_pieces.js'
import shuffle from 'lodash/shuffle'

class Game{

  constructor(options){
    this.board = new Board()
    this.ctx = options.ctx
    this.availablePieces = []
  }

  setup(){
    this.createPieces()
    this.board.handleKeyClicks()
    this.board.animate()
  }

  randomPiece(){
    const randomEl = this.availablePieces[0]
  }

  createPieces(){
    for(let i = 0; i < 4; i++){
      createPieces.forEach((pieceConstructor) => {
        this.availablePieces.push(pieceConstructor(this.ctx))
      })
    }
    this.availablPieces = shuffle(this.availablePieces)
  }
}

export default Game
