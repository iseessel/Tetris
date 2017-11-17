import gameBoard from './pieces/i_piece.js'
import AnchorSquare from './squares/anchor_square.js'
import RelativeSquare from './squares/relative_square.js'
import createTPiece from './pieces/t_piece.js'
import Piece from './piece.js'
import Board from './board.js'
import Game from './game.js'


const createGrid = (gameCtx) => {
  for(let i = 0; i < 500; i += 25){
    gameCtx.fillStyle = "rgba(255, 255, 255, 0.1)"
    gameCtx.fillRect(0, i, 300, 1);
  }
  for(let i = 0; i < 250; i+= 25){
    gameCtx.fillStyle = "rgba(255, 255, 255, 0.1)"
    gameCtx.fillRect(i, 0, 1, 600);
  }
}

window.addEventListener("load", () => {
  const gameCanvas = document.getElementById("game-canvas");
  const backgroundCanvas = document.getElementById("background-canvas");
  const scoreCanvas = document.getElementById("score-level-canvas");

  const backgroundgameCtx= backgroundCanvas.getContext("2d");
  const scoreCtx = scoreCanvas.getContext("2d")
  scoreCtx.font = "40px Press Start 2P"
  const gameCtx = gameCanvas.getContext("2d");



  createGrid(backgroundgameCtx)
  const game = new Game({gameCtx, scoreCtx});
  game.updateScore()
  game.setup()
})
