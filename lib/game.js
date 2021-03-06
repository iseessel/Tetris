import Board from './board.js'
import Piece from './piece.js'
import createPieces from './pieces/create_pieces.js'
import shuffle from 'lodash/shuffle'

const _levelVelocities = [
  850, 750, 650, 550, 500, 450, 400, 350, 325, 300,
  250, 225, 200, 175, 150, 140, 130, 120, 110
]

class Game{

  constructor(options){
    this.board = new Board({
      game: this,
      gameCtx: options.gameCtx,
      scoreCtx: options.scoreCtx,
      velocity: _levelVelocities[0]
    })
    this.level = 0
    this.linesCleared = 0
    this.playing = false
    this.nextPieceCtx = options.nextPieceCtx
    this.gameCtx = options.gameCtx
    this.scoreCtx = options.scoreCtx
    this.availablePieces = []
    this.sound = this.setupSound()
  }

  setupSound(){
    this.sound = document.createElement("audio");
    this.sound.src = './music/tetris-gameboy.mp3';
    this.sound.looping = true;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    return this.sound
  }

  toggleSound() {
    if(this.musicPlaying){
      this.sound.pause()
      this.musicPlaying = false
    }else{
      this.sound.play();
      this.musicPlaying = true
    }
  }

  updateScore(){
    this.scoreCtx.font = "bold 14px Verdana"
    this.scoreCtx.fillStyle = "whitesmoke"
    this.scoreCtx.clearRect(0, 0, 180, 284);
    this.scoreCtx.fillText(`${this.level + 1}`,5, 22);
    this.scoreCtx.fillText(`${this.linesCleared}`, 5, 47);
  }

  clearAnimations(){
    clearInterval(this.board.animationId)
    clearInterval(this.board.checkStops)
  }

  levelUp(){
    if(this.linesCleared >= (this.level + 1) * 5 ){
      this.level += 1
      this.board.velocity = _levelVelocities[this.level]
      this.clearAnimations()
      this.board.animate()
    }
  }

  setup(){
    this.keyPresses()
  }

  keyPresses(){
    window.addEventListener("keydown", (e) => {
      switch(e.keyCode){
        case 13:
          !this.playing && !this.restarting ?
            this.startPlaying() : null
          break;
        case 77:
          this.toggleSound()
          break;
        case 83:
          !this.playing && !this.restarting ?
            this.startPlaying() : null
          break;
        case 82:
          this.playing ? this.restart() :
            null
          break;
        case 80:
          if(!this.playing){
            this.playing = true
            this.board.animate()
          }else{
            this.clearAnimations()
            this.playing = false
          }
          break;
      }
    })
  }

  startPlaying(){
    this.play()
    this.playing = true;
  }

  restart(){
    $(".visible").toggleClass("visible hidden")
    this.restarting = true
    this.playing = false
    this.clearScore()
    this.clearAnimations()
    this.board.clearCanvas()
    this.board.createNullBoard()
    setTimeout(() => {
      this.playing = true
      this.introducePiece()
      this.board.activePiece.draw()
      this.board.velocity = _levelVelocities[this.level]
      this.board.animate()
      this.restarting = false
    }, 500)
  }

  clearScore(){
    this.level = 0
    this.linesCleared = 0
  }

  play(){
    if(!this.playing){
      this.createPieces()
      this.introducePiece()
    }
    this.boardKeyClicks = this.board.handleKeyClicks()
    this.board.animate()
  }

  introducePiece(){
    const randomPiece = this.randomPiece()
    this.board.introducePiece(randomPiece)
    this.availablePieces.length === 0
        ? this.createPieces()
        : null
    this.drawNextPiece(this.availablePieces[0])
  }

  drawNextPiece(piece){
    this.nextPieceCtx.clearRect(0, 0, 100, 100)
    const prevPosition = JSON.parse(JSON.stringify(piece.anchorSquare.position))
    piece.anchorSquare.position[0] = 2
    piece.anchorSquare.position[1] = 2
    piece.currentRotation().forEach((square) => {
      square.draw(piece.color, square.pos(), this.nextPieceCtx)
    })
    piece.anchorSquare.position = prevPosition
  }

  randomPiece(){
    const randomPiece = this.availablePieces[0]
    this.availablePieces.splice(0, 1)
    return randomPiece
  }

  createPieces(){
    for(let i = 0; i < 4; i++){
      createPieces.forEach((pieceConstructor) => {
        const piece = pieceConstructor(this.gameCtx)
        piece.board = this.board
        piece.squares().forEach((square) => {
          square.gameCtx = this.gameCtx
          square.anchorSquare = piece.anchorSquare
        })
        this.availablePieces.push(piece)
      })
    }
    this.availablePieces = shuffle(this.availablePieces)
  }
}

export default Game
