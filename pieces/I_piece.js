import Square from '../squares/square.js'
import Piece from '../piece.js'
import AnchorSquare from '../squares/anchor_square.js'
import RelativeSquare from '../squares/relative_square.js'
import nullSquareInstance from '../squares/null_square.js'

function createIPiece(ctx){

  const anchorSquare = new AnchorSquare({ctx: ctx, center: [4, 2]})

  const relativeSquareUpOne = new RelativeSquare({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareUpTwo = new RelativeSquare({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareUpThree = new RelativeSquare({ctx: ctx,
    offset: [0, -2], anchorSquare: anchorSquare})

  const rotationOne = [anchorSquare, relativeSquareUpOne, relativeSquareUpTwo, relativeSquareUpThree]

  const relativeSquareRightOne = new RelativeSquare({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareRightTwo = new RelativeSquare({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareRightThree = new RelativeSquare({ctx: ctx,
    offset: [2, -0], anchorSquare: anchorSquare})

  const rotationTwo = [anchorSquare, relativeSquareRightOne,
      relativeSquareRightTwo, relativeSquareRightThree]

  const relativeSquareDownOne = new RelativeSquare({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareDownTwo = new RelativeSquare({ctx: ctx,
    offset: [1, 1], anchorSquare: anchorSquare})
  const relativeSquareDownThree = new RelativeSquare({ctx: ctx,
    offset: [1, -2], anchorSquare: anchorSquare})
  const relativeSquareDownFour = new RelativeSquare({ctx: ctx,
    offset: [1, -1], anchorSquare: anchorSquare})

    const rotationThree = [relativeSquareDownOne, relativeSquareDownTwo,
       relativeSquareDownThree, relativeSquareDownFour]


  const rotations = [rotationOne, rotationTwo, rotationThree, rotationTwo]

  const piece = new Piece({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#2FFFFF"})

  return piece
}

export default createIPiece
