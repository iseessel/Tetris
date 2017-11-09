/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

  draw(color){
    const drawingCords = this.cordsToPos()
    this.ctx.fillStyle = color
    this.ctx.fillRect(drawingCords[0], drawingCords[1],
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

  cordsToPos(){
    return [this.pos()[0] * 40, this.pos()[1] * 40]
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Square);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(3);






function createIPiece(ctx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({ctx: ctx, center: [4, 2]})

  const relativeSquareUpOne = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareUpTwo = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareUpThree = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -2], anchorSquare: anchorSquare})

  const rotationOne = [anchorSquare, relativeSquareUpOne, relativeSquareUpTwo, relativeSquareUpThree]

  const relativeSquareRightOne = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareRightTwo = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareRightThree = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [2, -0], anchorSquare: anchorSquare})

  const rotationTwo = [anchorSquare, relativeSquareRightOne,
      relativeSquareRightTwo, relativeSquareRightThree]

  const relativeSquareDownOne = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareDownTwo = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 1], anchorSquare: anchorSquare})
  const relativeSquareDownThree = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, -2], anchorSquare: anchorSquare})
  const relativeSquareDownFour = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, -1], anchorSquare: anchorSquare})

    const rotationThree = [relativeSquareDownOne, relativeSquareDownTwo,
       relativeSquareDownThree, relativeSquareDownFour]


  const rotations = [rotationOne, rotationTwo, rotationThree, rotationTwo]

  const piece = new __WEBPACK_IMPORTED_MODULE_1__piece_js__["a" /* default */]({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#2FFFFF"})

  return piece
}

/* harmony default export */ __webpack_exports__["a"] = (createIPiece);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);


class Piece{

  constructor(options){
    this.anchorSquare = options.anchorSquare
    this.rotations = options.rotations
    this.currentRotationIdx = options.currentRotationIdx
    this.color = options.color
    this.vel = options.vel
  }
  currentRotation(){
    return this.rotations[this.currentRotationIdx]
  }

  animate(){
    this.draw(this.color)
    return window.setInterval(() => {
      this.clearRect()
      this.fallDown()
      this.draw()
    }, 500)
  }

  draw(){
    this.each(__WEBPACK_IMPORTED_MODULE_0__squares_square_js__["a" /* default */].prototype.draw, [this.color])
  }

  clearRect(){
    this.each((__WEBPACK_IMPORTED_MODULE_0__squares_square_js__["a" /* default */].prototype.clearRect))
  }

  fallDown(){
    this.clearRect()
    this.anchorSquare.fallDown()
    if(this.inBounds()){
      this.each(function(){
        this.draw()})
    }else{
      this.anchorSquare.position[1] -= 1
      this.board.activePiece = null
      this.draw()
    }
  }

  handleLeftKeyPress(){
    this.clearRect()
    this.anchorSquare.moveLeft()
    if(this.inBounds()){
      this.each(function(){
        this.draw()
      })
    }else{
      this.anchorSquare.moveRight()
      this.draw()
    }
  }

  handleRightKeyPress(){
    this.clearRect()
    this.anchorSquare.moveRight()
    if(this.inBounds()){
      this.each(function(){
        this.draw()
      })
    }else{
      this.anchorSquare.moveLeft()
      this.draw()
    }
  }

  rotate(){
    this.currentRotationIdx = (this.currentRotationIdx + 1) %
      this.rotations.length
  }

  handleUpKeyPress(){
    this.clearRect()
    this.rotate()
    if(this.inBounds()){
      this.each(function(){
        this.draw()
      })
    }else{
      while(!this.inBounds()){
        this.anchorSquare.pos()[0] > 5 ? this.anchorSquare.moveLeft()
          : this.anchorSquare.moveRight()
      }
      this.each(function(){
        this.draw()
      })
    }
  }

  each(callback, args){
    this.currentRotation().forEach((square) => {
      square instanceof __WEBPACK_IMPORTED_MODULE_0__squares_square_js__["a" /* default */] ? callback.apply(square, args) : null
    })
  }

  inBounds(){
    return this.currentRotation().every((square) => {
      return square.inBounds()
    })
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Piece);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class NullSquare{

  constructor(){
  }

  draw(){
  }

  fallDown(){
  }

  clearRect(){
  }

  inBounds(){
    return true;
  }

}

const nullSquareInstance = new NullSquare()
Object.freeze(nullSquareInstance)

/* harmony default export */ __webpack_exports__["a"] = (nullSquareInstance);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pieces_i_piece_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__squares_anchor_square_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_relative_square_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pieces_t_piece_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__piece_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__board_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_js__ = __webpack_require__(15);









window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const game = new __WEBPACK_IMPORTED_MODULE_6__game_js__["a" /* default */]({ctx});
  game.setup()
})


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__square_js__ = __webpack_require__(0);


class AnchorSquare extends __WEBPACK_IMPORTED_MODULE_0__square_js__["a" /* default */]{
  constructor(options){
    super(options)
    this.position = options.center
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

/* harmony default export */ __webpack_exports__["a"] = (AnchorSquare);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__square_js__ = __webpack_require__(0);


class RelativeSquare extends __WEBPACK_IMPORTED_MODULE_0__square_js__["a" /* default */]{
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

/* harmony default export */ __webpack_exports__["a"] = (RelativeSquare);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_null_square_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_square_js__ = __webpack_require__(0);
const _defaultPieces = []




class Board{

  constructor(){
    this.grid = []
    this.pieces = []
    this.activePiece = null
    this.createNullBoard()
  }

  animate(){
    this.activePiece ? this.activePiece.animate() : null
  }

  createNullBoard(){
    for(let i = 0; i < 40; i++){
      const row = []
      for(let j = 0; j < 20; j++){
        row.push(__WEBPACK_IMPORTED_MODULE_0__squares_null_square_js__["a" /* default */])
      }
      this.grid.push(row)
    }
  }

  introducePiece(piece){
    this.pieces.push(piece)
    this.activePiece = piece
    piece.currentRotation().forEach((square) => {
      if(square instanceof __WEBPACK_IMPORTED_MODULE_2__squares_square_js__["a" /* default */]){
        const squarePositionY = square.pos()[0]
        const squarePositionX = square.pos()[1]
        this.grid[squarePositionY][squarePositionX] = square
      }
    })
  }

  handleKeyClicks(){
    this.handleKeyPress = window.addEventListener("keydown", (e) => {
      switch(e.keyCode){
        case 37:
          this.activePiece ? this.activePiece.handleLeftKeyPress() : null
          break

        case 38:
          this.activePiece ? this.activePiece.handleUpKeyPress() : null
          break

        case 39:
          this.activePiece ? this.activePiece.handleRightKeyPress() : null
          break

        break
        case 40:
        this.activePiece ? this.activePiece.fallDown() : null
          break
      }
    })
  }



}

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(3);






function createSquarePiece(ctx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({ctx: ctx, center: [4, 1]})
  const relativeSquareOne = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwo = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareThree = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, -1], anchorSquare: anchorSquare})

  const rotationOne = [anchorSquare, relativeSquareOne, relativeSquareTwo, relativeSquareThree]

  const rotations = [rotationOne]

  const piece = new __WEBPACK_IMPORTED_MODULE_1__piece_js__["a" /* default */]({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#F7FF1F" })

  return piece
}

/* harmony default export */ __webpack_exports__["a"] = (createSquarePiece);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(3);






function createReverseLPiece(ctx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({ctx: ctx, center: [4, 1]})
  const relativeSquareOneUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareThreeUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, -1], anchorSquare: anchorSquare})

  const rotationOne = [anchorSquare, relativeSquareOneUp,
    relativeSquareTwoUp, relativeSquareThreeUp]

  const relativeSquareOneDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareTwoDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareThreeDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 1], anchorSquare: anchorSquare})

  const rotationTwo = [anchorSquare, relativeSquareOneDown, relativeSquareTwoDown,
    relativeSquareThreeDown]

  const relativeSquareOneLeft = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoLeft = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareThreeLeft = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 1], anchorSquare: anchorSquare})

  const rotationThree = [anchorSquare, relativeSquareOneLeft, relativeSquareTwoLeft,
    relativeSquareThreeLeft]

  const relativeSquareOneRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareTwoRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareThreeRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, -1], anchorSquare: anchorSquare})

  const rotationFour= [anchorSquare, relativeSquareOneRight, relativeSquareTwoRight,
    relativeSquareThreeRight]


  const rotations = [rotationOne, rotationTwo, rotationThree]

  const piece = new __WEBPACK_IMPORTED_MODULE_1__piece_js__["a" /* default */]({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#1700FA"})

  return piece
}

/* harmony default export */ __webpack_exports__["a"] = (createReverseLPiece);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(3);






function createLPiece(ctx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({ctx: ctx, center: [4, 1]})
  const relativeSquareOneUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareThreeUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, -1], anchorSquare: anchorSquare})

  const rotationOne = [anchorSquare, relativeSquareOneUp,
    relativeSquareTwoUp, relativeSquareThreeUp]

  const relativeSquareOneDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareTwoDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareThreeDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, -1], anchorSquare: anchorSquare})

  const rotationTwo = [anchorSquare, relativeSquareOneDown, relativeSquareTwoDown,
    relativeSquareThreeDown]

  const relativeSquareOneLeft = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoLeft = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareThreeLeft = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 1], anchorSquare: anchorSquare})

  const rotationThree = [anchorSquare, relativeSquareOneLeft, relativeSquareTwoLeft,
    relativeSquareThreeLeft]

  const relativeSquareOneRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareTwoRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareThreeRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 1], anchorSquare: anchorSquare})

  const rotationFour= [anchorSquare, relativeSquareOneRight, relativeSquareTwoRight,
    relativeSquareThreeRight]


  const rotations = [rotationOne, rotationTwo, rotationThree, rotationFour]

  const piece = new __WEBPACK_IMPORTED_MODULE_1__piece_js__["a" /* default */]({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#FA980B"})

  return piece
}

/* harmony default export */ __webpack_exports__["a"] = (createLPiece);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(3);






function createZPiece(ctx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({ctx: ctx, center: [4, 1]})
  const relativeSquareOneUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareThreeUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, -1], anchorSquare: anchorSquare})

  const rotationOne = [anchorSquare, relativeSquareOneUp,
    relativeSquareTwoUp, relativeSquareThreeUp]

  const relativeSquareOneDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareThreeDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 1], anchorSquare: anchorSquare})

  const rotationTwo = [anchorSquare, relativeSquareOneDown,
    relativeSquareTwoDown, relativeSquareThreeDown]

  const relativeSquareOneRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareThreeRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 1], anchorSquare: anchorSquare})

  const rotationThree = [anchorSquare, relativeSquareOneRight,
    relativeSquareTwoRight, relativeSquareThreeRight]

  const relativeSquareOneLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, -1], anchorSquare: anchorSquare})
  const relativeSquareThreeLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})

  const rotationFour = [anchorSquare, relativeSquareOneLeft,
    relativeSquareTwoLeft, relativeSquareThreeLeft]

  const rotations = [rotationOne, rotationTwo,
    rotationThree, rotationFour]

  const piece = new __WEBPACK_IMPORTED_MODULE_1__piece_js__["a" /* default */]({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#F80009"})

  return piece
}

/* harmony default export */ __webpack_exports__["a"] = (createZPiece);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(3);






function createReverseZPiece(ctx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({ctx: ctx, center: [4, 1]})
  const relativeSquareOneUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareTwoUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareThreeUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, -1], anchorSquare: anchorSquare})

  const rotationOne = [anchorSquare, relativeSquareOneUp,
    relativeSquareTwoUp, relativeSquareThreeUp]

  const relativeSquareOneDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareTwoDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareThreeDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, -1], anchorSquare: anchorSquare})

  const rotationTwo = [anchorSquare, relativeSquareOneDown,
    relativeSquareTwoDown, relativeSquareThreeDown]

  const relativeSquareOneRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareThreeRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 1], anchorSquare: anchorSquare})

  const rotationThree = [anchorSquare, relativeSquareOneRight,
    relativeSquareTwoRight, relativeSquareThreeRight]

  const relativeSquareOneLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareThreeLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 1], anchorSquare: anchorSquare})

  const rotationFour = [anchorSquare, relativeSquareOneLeft,
    relativeSquareTwoLeft, relativeSquareThreeLeft]

  const rotations = [rotationOne, rotationTwo,
    rotationThree, rotationFour]

  const piece = new __WEBPACK_IMPORTED_MODULE_1__piece_js__["a" /* default */]({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#27FF09" })

  return piece
}

/* harmony default export */ __webpack_exports__["a"] = (createReverseZPiece);


/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(3);






function createTPiece(ctx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({ctx: ctx, center: [4, 1]})
  const relativeSquareOneUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareThreeUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})

  const rotationOne = [anchorSquare, relativeSquareOneUp,
    relativeSquareTwoUp, relativeSquareThreeUp]

  const relativeSquareOneDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareTwoDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareThreeDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})

  const rotationTwo = [anchorSquare, relativeSquareOneDown,
    relativeSquareTwoDown, relativeSquareThreeDown]

  const relativeSquareOneRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})
  const relativeSquareTwoRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [1, 0], anchorSquare: anchorSquare})
  const relativeSquareThreeRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})

  const rotationThree = [anchorSquare, relativeSquareOneRight,
    relativeSquareTwoRight, relativeSquareThreeRight]

  const relativeSquareOneLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, -1], anchorSquare: anchorSquare})
  const relativeSquareTwoLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [0, 1], anchorSquare: anchorSquare})
  const relativeSquareThreeLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({ctx: ctx,
    offset: [-1, 0], anchorSquare: anchorSquare})

  const rotationFour = [anchorSquare, relativeSquareOneLeft,
    relativeSquareTwoLeft, relativeSquareThreeLeft]

  const rotations = [rotationOne, rotationTwo,
    rotationThree, rotationFour]

  const piece = new __WEBPACK_IMPORTED_MODULE_1__piece_js__["a" /* default */]({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#8500FB"})

  return piece
}

/* harmony default export */ __webpack_exports__["a"] = (createTPiece);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pieces_create_pieces_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_shuffle__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_shuffle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash_shuffle__);




class Game{

  constructor(options){
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* default */]()
    this.ctx = options.ctx
    this.availablePieces = []
  }

  setup(){
    this.createPieces()
    this.board.handleKeyClicks()
    this.board.animate()
  }

  randomPiece(){
    const randomEl = this.availablePieces[0]
  }

  createPieces(){
    for(let i = 0; i < 4; i++){
      __WEBPACK_IMPORTED_MODULE_1__pieces_create_pieces_js__["a" /* default */].forEach((pieceConstructor) => {
        this.availablePieces.push(pieceConstructor(this.ctx))
      })
    }
    this.availablPieces = __WEBPACK_IMPORTED_MODULE_2_lodash_shuffle___default()(this.availablePieces)
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__i_piece_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__l_piece_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reverse_l_piece_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reverse_z_piece_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__square_piece_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__t_piece_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__z_piece_js__ = __webpack_require__(11);









/* harmony default export */ __webpack_exports__["a"] = ([__WEBPACK_IMPORTED_MODULE_0__i_piece_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__l_piece_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__reverse_l_piece_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_3__reverse_z_piece_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__square_piece_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__t_piece_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__z_piece_js__["a" /* default */]]);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(20),
    getRawTag = __webpack_require__(40),
    objectToString = __webpack_require__(41);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var baseRandom = __webpack_require__(29);

/**
 * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
 *
 * @private
 * @param {Array} array The array to shuffle.
 * @param {number} [size=array.length] The size of `array`.
 * @returns {Array} Returns `array`.
 */
function shuffleSelf(array, size) {
  var index = -1,
      length = array.length,
      lastIndex = length - 1;

  size = size === undefined ? length : size;
  while (++index < size) {
    var rand = baseRandom(index, lastIndex),
        value = array[rand];

    array[rand] = array[index];
    array[index] = value;
  }
  array.length = size;
  return array;
}

module.exports = shuffleSelf;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(21);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(22);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39)))

/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var arrayShuffle = __webpack_require__(27),
    baseShuffle = __webpack_require__(30),
    isArray = __webpack_require__(23);

/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * _.shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 */
function shuffle(collection) {
  var func = isArray(collection) ? arrayShuffle : baseShuffle;
  return func(collection);
}

module.exports = shuffle;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var copyArray = __webpack_require__(28),
    shuffleSelf = __webpack_require__(19);

/**
 * A specialized version of `_.shuffle` for arrays.
 *
 * @private
 * @param {Array} array The array to shuffle.
 * @returns {Array} Returns the new shuffled array.
 */
function arrayShuffle(array) {
  return shuffleSelf(copyArray(array));
}

module.exports = arrayShuffle;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor,
    nativeRandom = Math.random;

/**
 * The base implementation of `_.random` without support for returning
 * floating-point numbers.
 *
 * @private
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the random number.
 */
function baseRandom(lower, upper) {
  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
}

module.exports = baseRandom;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var shuffleSelf = __webpack_require__(19),
    values = __webpack_require__(31);

/**
 * The base implementation of `_.shuffle`.
 *
 * @private
 * @param {Array|Object} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 */
function baseShuffle(collection) {
  return shuffleSelf(values(collection));
}

module.exports = baseShuffle;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var baseValues = __webpack_require__(32),
    keys = __webpack_require__(34);

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

module.exports = values;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(33);

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(35),
    baseKeys = __webpack_require__(49),
    isArrayLike = __webpack_require__(53);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(36),
    isArguments = __webpack_require__(37),
    isArray = __webpack_require__(23),
    isBuffer = __webpack_require__(42),
    isIndex = __webpack_require__(44),
    isTypedArray = __webpack_require__(45);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(38),
    isObjectLike = __webpack_require__(18);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(17),
    isObjectLike = __webpack_require__(18);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(20);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(21),
    stubFalse = __webpack_require__(43);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(24)(module)))

/***/ }),
/* 43 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(46),
    baseUnary = __webpack_require__(47),
    nodeUtil = __webpack_require__(48);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(17),
    isLength = __webpack_require__(25),
    isObjectLike = __webpack_require__(18);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(22);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(24)(module)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(50),
    nativeKeys = __webpack_require__(51);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(52);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(54),
    isLength = __webpack_require__(25);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(17),
    isObject = __webpack_require__(55);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map