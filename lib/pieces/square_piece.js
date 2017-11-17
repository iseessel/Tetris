import Square from '../squares/square.js'
import Piece from '../piece.js'
import AnchorSquare from '../squares/anchor_square.js'
import RelativeSquare from '../squares/relative_square.js'
import nullSquareInstance from '../squares/null_square.js'

function createSquarePiece(gameCtx){

  const anchorSquare = new AnchorSquare({center: [4, 1]})
  const relativeSquareOne = new RelativeSquare({offset: [-1, 0]})
  const relativeSquareTwo = new RelativeSquare({offset: [0, -1]})
  const relativeSquareThree = new RelativeSquare({offset: [-1, -1]})

  const rotationOne = [anchorSquare, relativeSquareOne, relativeSquareTwo, relativeSquareThree]

  const rotations = [rotationOne]

  const piece = new Piece({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#F7FF1F" })

  return piece
}

export default createSquarePiece
