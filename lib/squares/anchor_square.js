import Square from './square.js'

class AnchorSquare extends Square{
  constructor(options){
    super(options)
    this.position = options.center
  }

  shiftUp(){
    this.position[1] -= 1
  }

  fallDown(){
    this.position[1] += 1
  }

  moveLeft(){
    this.position[0] -= 1
  }

  moveRight(){
    this.position[0] += 1
  }

  pos(){
    return this.position
  }
}

export default AnchorSquare
