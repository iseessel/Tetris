import Square from '../squares/square.js'
import Piece from '../piece.js'
import AnchorSquare from '../squares/anchor_square.js'
import RelativeSquare from '../squares/relative_square.js'
import nullSquareInstance from '../squares/null_square.js'

function createZPiece(gameCtx){

  const anchorSquare = new AnchorSquare({gameCtx: gameCtx, center: [4, 1]})
  const relativeSquareOneUp = new RelativeSquare({gameCtx: gameCtx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoUp = new RelativeSquare({gameCtx: gameCtx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareThreeUp = new RelativeSquare({gameCtx: gameCtx,
    offset: [1, -1], anchorSquare: anchorSquare})

  const rotationOne = [anchorSquare, relativeSquareOneUp,
    relativeSquareTwoUp, relativeSquareThreeUp]

  const relativeSquareOneDown = new RelativeSquare({gameCtx: gameCtx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoDown = new RelativeSquare({gameCtx: gameCtx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareThreeDown = new RelativeSquare({gameCtx: gameCtx,
    offset: [1, 1], anchorSquare: anchorSquare})

  const rotationTwo = [anchorSquare, relativeSquareOneDown,
    relativeSquareTwoDown, relativeSquareThreeDown]

  const relativeSquareOneRight = new RelativeSquare({gameCtx: gameCtx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoRight = new RelativeSquare({gameCtx: gameCtx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareThreeRight = new RelativeSquare({gameCtx: gameCtx,
    offset: [-1, 1], anchorSquare: anchorSquare})

  const rotationThree = [anchorSquare, relativeSquareOneRight,
    relativeSquareTwoRight, relativeSquareThreeRight]

  const relativeSquareOneLeft= new RelativeSquare({gameCtx: gameCtx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoLeft= new RelativeSquare({gameCtx: gameCtx,
    offset: [-1, -1], anchorSquare: anchorSquare})
  const relativeSquareThreeLeft= new RelativeSquare({gameCtx: gameCtx,
    offset: [0, 1], anchorSquare: anchorSquare})

  const rotationFour = [anchorSquare, relativeSquareOneLeft,
    relativeSquareTwoLeft, relativeSquareThreeLeft]

  const rotations = [rotationOne, rotationTwo,
    rotationThree, rotationFour]

  const piece = new Piece({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#F80009"})

  return piece
}

export default createZPiece
