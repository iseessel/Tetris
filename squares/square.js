const _defaults = {
  dimensions: [40, 40],
  falling: 40
}
//Can make these modular with regards to the size of canvas.

class Square{

  constructor(options){
    this.color = options.color
    this.ctx = options.ctx
    this.vel = options.vel //Velocity is squares per ms i.e. 20px per ms.
    this.dimensions = _defaults.dimensions
  }

  //NB: When a piece is no longer moving on the board, we will use
  // its static position on the grid, passed in from the board.
  draw(color, pos = this.pos()){
    this.color = (color ? color : this.color)
    const drawingPos = this.cordsToPos(pos)
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(drawingPos[0], drawingPos[1],
      this.dimensions[0], this.dimensions[1]);
  }

  clearRect(){
    const drawingCords = this.cordsToPos()
    this.ctx.clearRect(drawingCords[0], drawingCords[1],
      this.dimensions[0], this.dimensions[1])
  }

  inBounds(){
    return this.pos()[0] >= 0 && this.pos()[0] < 10
      && this.pos()[1] >= 0 && this.pos()[1] < 20
  }

  cordsToPos(pos = this.pos()){
    return [pos[0] * 40, pos[1] * 40]
  }

  atBottom(){
    return this.pos()[1] === 19
  }

}

export default Square
