import Square from '../squares/square.js'
import Piece from '../piece.js'
import AnchorSquare from '../squares/anchor_square.js'
import RelativeSquare from '../squares/relative_square.js'
import nullSquareInstance from '../squares/null_square.js'

function createReverseLPiece(ctx){

  const anchorSquare = new AnchorSquare({ctx: ctx, center: [4, 1]})
  const relativeSquareOneUp = new RelativeSquare({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoUp = new RelativeSquare({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareThreeUp = new RelativeSquare({ctx: ctx,
    offset: [1, -1], anchorSquare: anchorSquare})

  const rotationOne = [anchorSquare, relativeSquareOneUp,
    relativeSquareTwoUp, relativeSquareThreeUp]

  const relativeSquareOneDown = new RelativeSquare({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareTwoDown = new RelativeSquare({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareThreeDown = new RelativeSquare({ctx: ctx,
    offset: [1, 1], anchorSquare: anchorSquare})

  const rotationTwo = [anchorSquare, relativeSquareOneDown, relativeSquareTwoDown,
    relativeSquareThreeDown]

  const relativeSquareOneLeft = new RelativeSquare({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoLeft = new RelativeSquare({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareThreeLeft = new RelativeSquare({ctx: ctx,
    offset: [-1, 1], anchorSquare: anchorSquare})

  const rotationThree = [anchorSquare, relativeSquareOneLeft, relativeSquareTwoLeft,
    relativeSquareThreeLeft]

  const relativeSquareOneRight = new RelativeSquare({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareTwoRight = new RelativeSquare({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareThreeRight = new RelativeSquare({ctx: ctx,
    offset: [-1, -1], anchorSquare: anchorSquare})

  const rotationFour= [anchorSquare, relativeSquareOneRight, relativeSquareTwoRight,
    relativeSquareThreeRight]


  const rotations = [rotationOne, rotationTwo, rotationThree]

  const piece = new Piece({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#1700FA"})

  return piece
}

export default createReverseLPiece