import Square from '../squares/square.js'
import Piece from '../piece.js'
import AnchorSquare from '../squares/anchor_square.js'
import RelativeSquare from '../squares/relative_square.js'
import nullSquareInstance from '../squares/null_square.js'

function createReverseLPiece(gameCtx){

  const anchorSquare = new AnchorSquare({center: [4, 1]})
  const relativeSquareOneUp = new RelativeSquare({offset: [-1, 0]})
  const relativeSquareTwoUp = new RelativeSquare({offset: [1, 0]})
  const relativeSquareThreeUp = new RelativeSquare({offset: [1, -1]})

  const rotationOne = [anchorSquare, relativeSquareOneUp,
    relativeSquareTwoUp, relativeSquareThreeUp]

  const relativeSquareOneDown = new RelativeSquare({offset: [0, -1]})
  const relativeSquareTwoDown = new RelativeSquare({offset: [0, 1]})
  const relativeSquareThreeDown = new RelativeSquare({offset: [1, 1]})

  const rotationTwo = [anchorSquare, relativeSquareOneDown, relativeSquareTwoDown,
    relativeSquareThreeDown]

  const relativeSquareOneLeft = new RelativeSquare({offset: [1, 0]})
  const relativeSquareTwoLeft = new RelativeSquare({offset: [-1, 0]})
  const relativeSquareThreeLeft = new RelativeSquare({offset: [-1, 1]})

  const rotationThree = [anchorSquare, relativeSquareOneLeft, relativeSquareTwoLeft,
    relativeSquareThreeLeft]

  const relativeSquareOneRight = new RelativeSquare({offset: [0, -1]})
  const relativeSquareTwoRight = new RelativeSquare({offset: [0, 1]})
  const relativeSquareThreeRight = new RelativeSquare({offset: [-1, -1]})

  const rotationFour= [anchorSquare, relativeSquareOneRight, relativeSquareTwoRight,
    relativeSquareThreeRight]


  const rotations = [rotationOne, rotationTwo, rotationThree, rotationFour]

  const piece = new Piece({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#1700FA"})

  return piece
}

export default createReverseLPiece
