import Square from '../squares/square.js'
import Piece from '../piece.js'
import AnchorSquare from '../squares/anchor_square.js'
import RelativeSquare from '../squares/relative_square.js'
import nullSquareInstance from '../squares/null_square.js'

function createIPiece(gameCtx){

  const anchorSquare = new AnchorSquare({center: [4, 2]})

  const relativeSquareUpOne = new RelativeSquare({offset: [0, 1]})
  const relativeSquareUpTwo = new RelativeSquare({offset: [0, -1]})
  const relativeSquareUpThree = new RelativeSquare({offset: [0, -2]})

  const rotationOne = [anchorSquare, relativeSquareUpOne, relativeSquareUpTwo, relativeSquareUpThree]

  const relativeSquareRightOne = new RelativeSquare({offset: [-1, 0]})
  const relativeSquareRightTwo = new RelativeSquare({offset: [1, 0]})
  const relativeSquareRightThree = new RelativeSquare({offset: [2, -0]})

  const rotationTwo = [anchorSquare, relativeSquareRightOne,
      relativeSquareRightTwo, relativeSquareRightThree]

  const relativeSquareDownOne = new RelativeSquare({offset: [1, 0]})
  const relativeSquareDownTwo = new RelativeSquare({offset: [1, 1]})
  const relativeSquareDownThree = new RelativeSquare({offset: [1, -2]})
  const relativeSquareDownFour = new RelativeSquare({offset: [1, -1]})

    const rotationThree = [relativeSquareDownOne, relativeSquareDownTwo,
       relativeSquareDownThree, relativeSquareDownFour]


  const rotations = [rotationOne, rotationTwo, rotationThree, rotationTwo]

  const piece = new Piece({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#2FFFFF"})

  return piece
}

export default createIPiece
