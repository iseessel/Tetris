const _defaultPieces = []
import nullSquareInstance from './squares/null_square.js'
import Piece from './piece.js'
import Square from './squares/square.js'

const _defaultBoardSize = [250, 500]

class Board{

  constructor(options){
    this.game = options.game
    this.velocity = options.velocity
    this.gameCtx = options.gameCtx
    this.scoreCtx = options.scoreCtx
    this.grid = []
    this.activePiece = null
    this.createNullBoard()
  }

  animate(){
    this.game.updateScore()
    this.activePiece.draw()
    this.animationId = window.setInterval(() => {
      this.activePiece.clearRect()
      this.activePiece.fallDown()
      this.activePiece.draw()
    }, this.velocity)

    this.checkStops = window.setInterval(() => {
      if(this.squareMustStop() && !this.stopping){
        this.stopping = true
        setTimeout(() => {
          this.stopping = false
          if(this.squareMustStop()){
            !this.game.restarting ? this.handleStoppedSquare() : null
          }
        }, 500)
      }
    }, 50)
  }

  handleStoppedSquare(){
    this.stopSquare()
    this.game.introducePiece()
    this.checkForRowClear()
    this.activePiece.draw()
  }

  squareMustStop(){
    return this.activePieceAtBottom() ||
      this.activePieceCollide("down")
  }

  stopSquare(){
    this.cementActivePieceOnGrid()
    this.activePiece = null
  }

  cementActivePieceOnGrid(){
    this.activePiece.currentRotation().forEach((square) => {
      const position = square.pos();
      this.grid[position[1]][position[0]] = square
    })
  }

  activePieceCollide(direction){
    const rotation = this.activePiece.currentRotation()
    for(let i = 0; i < rotation.length; i++){
      const position = rotation[i].pos()
      let posX = position[1]
      let posY = position[0]
      if(posX < 0){
        continue
      }
      switch(direction){
        case("down"):
          posX += 1
          break;
      }
      if (!(this.grid[posX][posY] ==
        nullSquareInstance)){
          return true
        }
    }

  return false
  }

  activePieceAtBottom(){
    return this.activePiece.atBottom()
  }

  activePieceInBounds(){
    return this.activePiece.inBounds()
  }

  createNullBoard(){
    this.grid = []
    for(let i = 0; i < 20; i++){
      const row = []
      for(let j = 0; j < 10; j++){
        row.push(nullSquareInstance)
      }
      this.grid.push(row)
    }
  }

  gameLost(){
    return this.activePieceCollide()
  }


  introducePiece(piece){
    this.activePiece = piece
    if(this.gameLost()){
      this.stopGame()
    }
  }

  allPiecesOffScreen(){
    return this.activePiece.currentRotation().every((square) => {
      return square.pos()[1] < 0
    })
  }

  stopGame(){
    this.game.restarting = true
    clearInterval(this.checkStops)
    clearInterval(this.animationId)
    $(".hidden").toggleClass("hidden visible")
    while(this.activePieceCollide()){
      this.activePiece.anchorSquare.shiftUp()
    }
    this.activePiece.draw()
  }


  checkForRowClear(){
    const rowsToBeCleared = []
    this.grid.forEach((row, idx) => {
      this.rowClearable(row) ? rowsToBeCleared.push(idx) : null
    })
    if(rowsToBeCleared.length !== 0){
      this.clearRows(rowsToBeCleared)
      this.game.levelUp()
      this.game.updateScore()
    }
  }

  rowClearable(row){
    return row.every((piece) => {
      return piece !== nullSquareInstance
    })
  }

  clearRows(indeces){
    this.game.linesCleared += indeces.length
    this.clearCanvas()
    indeces.forEach((idx) => {
      this.clearRow(idx)
    })
    this.reDrawGrid()
  }

  clearRow(idx){
    this.grid.splice(idx, 1)
    const row = []
    for(let i = 0; i < 10; i++ ){
      row.push(nullSquareInstance)
    }
    this.grid.unshift(row)
  }

  reDrawGrid(){
    this.grid.forEach((row, i) => {
      row.forEach((square, j) => {
        if(square != nullSquareInstance){
          square.draw(null, [j, i])
        }
      })
    })
  }

  clearCanvas(idx){
    this.gameCtx.clearRect(0, 0, _defaultBoardSize[0],
      _defaultBoardSize[1])
  }

  handleKeyClicks(){
    return this.handleKeyPress = window.addEventListener("keydown", (e) => {
      switch(e.keyCode){
        case 37:
          e.preventDefault()
          this.activePiece && this.game.playing ?
          this.activePiece.handleLeftKeyPress()
          : null
          break

        case 38:
          e.preventDefault()
          this.activePiece && this.game.playing ?
          this.activePiece.handleUpKeyPress()
          : null
          break

        case 39:
          e.preventDefault()
          this.activePiece && this.game.playing  ?
          this.activePiece.handleRightKeyPress()
          : null
          break

        case 40:
          e.preventDefault()
          this.activePiece && this.game.playing  ?
          this.activePiece.fallDown()
          : null
          break
      }
    })
  }
}

export default Board
