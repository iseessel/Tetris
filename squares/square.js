const _defaultBoardSize = [250, 500]

const _defaults = {
  dimensions: [_defaultBoardSize[0] / 10,
    _defaultBoardSize[1] / 20],
  falling: _defaultBoardSize[0] / 10
}
//Can make these modular with regards to the size of canvas.

class Square{

  constructor(options){
    this.color = options.color
    this.gameCtx = options.gameCtx
    this.vel = options.vel //Velocity is squares per ms i.e. 20px per ms.
    this.dimensions = _defaults.dimensions
  }

  //NB: When a piece is no longer moving on the board, we will use
  // its static position on the grid, passed in from the board.
  draw(color, pos = this.pos()){
    this.color = (color ? color : this.color)
    const drawingPos = this.cordsToPos(pos)
    this.gameCtx.fillStyle = this.color
    this.gameCtx.fillRect(drawingPos[0] + 1, drawingPos[1] + 1,
      this.dimensions[0] - 4, this.dimensions[1] - 4);
  }

  clearRect(){
    const drawingCords = this.cordsToPos()
    this.gameCtx.clearRect(drawingCords[0], drawingCords[1],
      this.dimensions[0], this.dimensions[1])
  }

  inBounds(){
    return this.pos()[0] >= 0 && this.pos()[0] < 10
      && this.pos()[1] >= 0 && this.pos()[1] < 20
  }

  cordsToPos(pos = this.pos()){
    return [pos[0] * _defaults.falling, pos[1] * _defaults.falling]
  }

  atBottom(){
    return this.pos()[1] === 19
  }

}

export default Square
