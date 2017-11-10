import gameBoard from './pieces/i_piece.js'
import AnchorSquare from './squares/anchor_square.js'
import RelativeSquare from './squares/relative_square.js'
import createTPiece from './pieces/t_piece.js'
import Piece from './piece.js'
import Board from './board.js'
import Game from './game.js'


window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const game = new Game({ctx});
  game.play()
})
