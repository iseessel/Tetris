import Square from './square.js'

class RelativeSquare extends Square{
  constructor(options){
    super(options)
    this.offset = options.offset
    this.anchorSquare = options.anchorSquare
  }

  pos(){
    const anchorPiecePosition = this.anchorSquare.pos()
    return [anchorPiecePosition[0] + this.offset[0],
    anchorPiecePosition[1] + this.offset[1]]
  }
}

export default RelativeSquare
