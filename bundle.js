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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
  draw(color, pos = this.pos(), ctx = this.gameCtx){
    pos = pos ? pos : this.pos()
    if(this.inBounds()){
      this.color = (color ? color : this.color)
      const drawingPos = this.cordsToPos(pos)
      ctx.fillStyle = this.color
      ctx.fillRect(drawingPos[0] + 1, drawingPos[1] + 1,
        this.dimensions[0] - 4, this.dimensions[1] - 4);
    }
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

/* harmony default export */ __webpack_exports__["a"] = (Square);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__squares_anchor_square_js__ = __webpack_require__(2);



class Piece{

  constructor(options){
    this.anchorSquare = options.anchorSquare
    this.src = options.src
    this.rotations = options.rotations
    this.currentRotationIdx = options.currentRotationIdx
    this.color = options.color
    this.vel = options.vel
  }

  squares(){
    let squares = []
    this.rotations.forEach((rotation) => {
      squares = squares.concat(rotation)
    })
    return squares
  }

  dupPiece(){
    // return JSON.parse(JSON.stringify())
    // const piece = new Piece({rotations: this.rotations, currentRotationIdx: 0,
    //     vel: 500, anchorSquare: new AnchorSquare({center: [2, 2]}),
    //     color: "#FA980B"})
    // piece.rotations.forEach((rotation) =>{
    //   rotation.forEach((square) => {
    //     square.anchorSquare = piece.anchorSquare
    //   })
    // })
    //
    return piece;
  }

  each(callback, args){
    this.currentRotation().forEach((square) => {
      callback.apply(square, args)
    })
  }

  currentRotation(){
    return this.rotations[this.currentRotationIdx]
  }

  draw(){
    this.each(__WEBPACK_IMPORTED_MODULE_0__squares_square_js__["a" /* default */].prototype.draw, [this.color])
  }

  clearRect(){
    this.each((__WEBPACK_IMPORTED_MODULE_0__squares_square_js__["a" /* default */].prototype.clearRect))
  }

  rotate(){
    this.currentRotationIdx = (this.currentRotationIdx + 1) %
      this.rotations.length
  }

  fallDown(){
    this.clearRect()
    if(!this.atBottom() &&
    !this.board.activePieceCollide("down")){
      this.anchorSquare.fallDown()
      this.each(() => {
        this.draw()
      })
      }else{
      this.draw()
    }
  }

  handleLeftKeyPress(){
    this.clearRect()
    this.anchorSquare.moveLeft()
    if(this.inBounds() && !this.board.activePieceCollide()){
      this.each(() => {
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
    if(this.inBounds() && !this.board.activePieceCollide()){
      this.each(() => {
        this.draw()
      })
    }else{
      this.anchorSquare.moveLeft()
      this.draw()
    }
  }

  unRotate(){
    this.currentRotationIdx = (this.currentRotationIdx
      + this.rotations.length - 1) %
      this.rotations.length
  }

  handleUpKeyPress(){
    this.clearRect()
    this.rotate()
    if(this.inBounds() && !this.board.activePieceCollide()){
      this.each(() => {
        this.draw()
      })
    }else{
      this.wallKick() ? null : this.unRotate()
    }
    this.each(() => {
      this.draw()
    })
  }

  wallKick(){
    //Naively search for a position to move to; if are available on one side,
    //try the other side -- otherwise give up and return to original position.
    //NB: This naive way results in fewer computations than checking which side a collision is on.
    for(let i = 0; i < 2; i ++){
      if (this.positionAvailable()){
        this.anchorSquare.moveLeft()
      }else {
        return true
      }
    }

    for(let j = 0; j < 4; j++){
      if(this.positionAvailable()){
        this.anchorSquare.moveRight()
      }else {
        return true
      }
    }

    for(let q = 0; q < 2; q++){
      this.anchorSquare.moveLeft()
    }

    return false
  }

  positionAvailable(){
    return !this.inBounds() || this.board.activePieceCollide()
  }

  atBottom(){
    return this.currentRotation().some((square) => {
      return square.atBottom()
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__square_js__ = __webpack_require__(0);


class AnchorSquare extends __WEBPACK_IMPORTED_MODULE_0__square_js__["a" /* default */]{
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

/* harmony default export */ __webpack_exports__["a"] = (AnchorSquare);


/***/ }),
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(11),
    getRawTag = __webpack_require__(39),
    objectToString = __webpack_require__(40);

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
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(4);






function createIPiece(gameCtx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({center: [4, 2]})

  const relativeSquareUpOne = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, 1]})
  const relativeSquareUpTwo = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -1]})
  const relativeSquareUpThree = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -2]})

  const rotationOne = [anchorSquare, relativeSquareUpOne, relativeSquareUpTwo, relativeSquareUpThree]

  const relativeSquareRightOne = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 0]})
  const relativeSquareRightTwo = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 0]})
  const relativeSquareRightThree = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [2, -0]})

  const rotationTwo = [anchorSquare, relativeSquareRightOne,
      relativeSquareRightTwo, relativeSquareRightThree]

  const relativeSquareDownOne = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 0]})
  const relativeSquareDownTwo = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 1]})
  const relativeSquareDownThree = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, -2]})
  const relativeSquareDownFour = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, -1]})

    const rotationThree = [relativeSquareDownOne, relativeSquareDownTwo,
       relativeSquareDownThree, relativeSquareDownFour]


  const rotations = [rotationOne, rotationTwo, rotationThree, rotationTwo]

  const piece = new __WEBPACK_IMPORTED_MODULE_1__piece_js__["a" /* default */]({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#2FFFFF"})

  return piece
}

/* harmony default export */ __webpack_exports__["a"] = (createIPiece);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(4);






function createTPiece(gameCtx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({center: [4, 1]})
  const relativeSquareOneUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 0]})
  const relativeSquareTwoUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 0]})
  const relativeSquareThreeUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -1]})

  const rotationOne = [anchorSquare, relativeSquareOneUp,
    relativeSquareTwoUp, relativeSquareThreeUp]

  const relativeSquareOneDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -1]})
  const relativeSquareTwoDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, 1]})
  const relativeSquareThreeDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 0]})

  const rotationTwo = [anchorSquare, relativeSquareOneDown,
    relativeSquareTwoDown, relativeSquareThreeDown]

  const relativeSquareOneRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 0]})
  const relativeSquareTwoRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 0]})
  const relativeSquareThreeRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, 1]})

  const rotationThree = [anchorSquare, relativeSquareOneRight,
    relativeSquareTwoRight, relativeSquareThreeRight]

  const relativeSquareOneLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -1]})
  const relativeSquareTwoLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, 1]})
  const relativeSquareThreeLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 0]})

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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_null_square_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_square_js__ = __webpack_require__(0);
const _defaultPieces = []




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
        __WEBPACK_IMPORTED_MODULE_0__squares_null_square_js__["a" /* default */])){
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
        row.push(__WEBPACK_IMPORTED_MODULE_0__squares_null_square_js__["a" /* default */])
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
      return piece !== __WEBPACK_IMPORTED_MODULE_0__squares_null_square_js__["a" /* default */]
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
      row.push(__WEBPACK_IMPORTED_MODULE_0__squares_null_square_js__["a" /* default */])
    }
    this.grid.unshift(row)
  }

  reDrawGrid(){
    this.grid.forEach((row, i) => {
      row.forEach((square, j) => {
        if(square != __WEBPACK_IMPORTED_MODULE_0__squares_null_square_js__["a" /* default */]){
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

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var baseRandom = __webpack_require__(28);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(12);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(13);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(38)))

/***/ }),
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pieces_i_piece_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__squares_anchor_square_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_relative_square_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pieces_t_piece_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__piece_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__board_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_js__ = __webpack_require__(18);









const createGrid = (gameCtx, nextPieceBgCtx) => {
  for(let i = 0; i < 500; i += 25){
    gameCtx.fillStyle = "rgba(255, 255, 255, 0.1)"
    gameCtx.fillRect(0, i, 300, 1);
  }
  for(let i = 0; i < 250; i+= 25){
    gameCtx.fillStyle = "rgba(255, 255, 255, 0.1)"
    gameCtx.fillRect(i, 0, 1, 600);
  }

  for(let i = 0; i < 100; i += 25){
    nextPieceBgCtx.fillStyle = "rgba(255, 255, 255, 0.1)"
    nextPieceBgCtx.fillRect(0, i, 300, 1);
  }
  for(let i = 0; i < 100; i+= 25){
    nextPieceBgCtx.fillStyle = "rgba(255, 255, 255, 0.1)"
    nextPieceBgCtx.fillRect(i, 0, 1, 600);
  }
}

window.addEventListener("load", () => {
  const gameCanvas = document.getElementById("game-canvas");
  const backgroundCanvas = document.getElementById("background-canvas");
  const scoreCanvas = document.getElementById("score-level-canvas");
  const nextPieceCanvas = document.getElementById("next-piece-canvas")
  const nextPieceBgCanvas = document.getElementById("next-piece-background-canvas")

  const backgroundgameCtx= backgroundCanvas.getContext("2d");
  const scoreCtx = scoreCanvas.getContext("2d")
  const nextPieceBgCtx = nextPieceBgCanvas.getContext("2d")
  const nextPieceCtx = nextPieceCanvas.getContext("2d")

  scoreCtx.font = "40px Press Start 2P"
  const gameCtx = gameCanvas.getContext("2d");



  createGrid(backgroundgameCtx, nextPieceBgCtx)
  const game = new __WEBPACK_IMPORTED_MODULE_6__game_js__["a" /* default */]({gameCtx, scoreCtx, nextPieceCtx});
  game.updateScore()
  game.setup()
})


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pieces_create_pieces_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_shuffle__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_shuffle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash_shuffle__);





const _levelVelocities = [
  850, 750, 650, 550, 500, 450, 400, 350, 325, 300,
  250, 225, 200, 175, 150, 140, 130, 120, 110
]

class Game{

  constructor(options){
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* default */]({
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
      __WEBPACK_IMPORTED_MODULE_2__pieces_create_pieces_js__["a" /* default */].forEach((pieceConstructor) => {
        const piece = pieceConstructor(this.gameCtx)
        piece.board = this.board
        piece.squares().forEach((square) => {
          square.gameCtx = this.gameCtx
          square.anchorSquare = piece.anchorSquare
        })
        this.availablePieces.push(piece)
      })
    }
    this.availablePieces = __WEBPACK_IMPORTED_MODULE_3_lodash_shuffle___default()(this.availablePieces)
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__i_piece_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__l_piece_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reverse_l_piece_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reverse_z_piece_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__square_piece_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__t_piece_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__z_piece_js__ = __webpack_require__(24);









// export default [createIPiece]
/* harmony default export */ __webpack_exports__["a"] = ([__WEBPACK_IMPORTED_MODULE_0__i_piece_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__l_piece_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__reverse_l_piece_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_3__reverse_z_piece_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__square_piece_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__t_piece_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__z_piece_js__["a" /* default */]]);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(4);






function createLPiece(gameCtx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({center: [4, 1]})
  const relativeSquareOneUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 0]})
  const relativeSquareTwoUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 0]})
  const relativeSquareThreeUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, -1]})

  const rotationOne = [anchorSquare, relativeSquareOneUp,
    relativeSquareTwoUp, relativeSquareThreeUp]

  const relativeSquareOneDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -1]})
  const relativeSquareTwoDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, 1]})
  const relativeSquareThreeDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, -1]})

  const rotationTwo = [anchorSquare, relativeSquareOneDown, relativeSquareTwoDown,
    relativeSquareThreeDown]

  const relativeSquareOneLeft = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 0]})
  const relativeSquareTwoLeft = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 0]})
  const relativeSquareThreeLeft = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 1]})

  const rotationThree = [anchorSquare, relativeSquareOneLeft, relativeSquareTwoLeft,
    relativeSquareThreeLeft]

  const relativeSquareOneRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -1]})
  const relativeSquareTwoRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, 1]})
  const relativeSquareThreeRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 1]})

  const rotationFour= [anchorSquare, relativeSquareOneRight, relativeSquareTwoRight,
    relativeSquareThreeRight]


  const rotations = [rotationOne, rotationTwo, rotationThree, rotationFour]

  const piece = new __WEBPACK_IMPORTED_MODULE_1__piece_js__["a" /* default */]({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#FA980B"})

  return piece
}

/* harmony default export */ __webpack_exports__["a"] = (createLPiece);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(4);






function createReverseLPiece(gameCtx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({center: [4, 1]})
  const relativeSquareOneUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 0]})
  const relativeSquareTwoUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 0]})
  const relativeSquareThreeUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, -1]})

  const rotationOne = [anchorSquare, relativeSquareOneUp,
    relativeSquareTwoUp, relativeSquareThreeUp]

  const relativeSquareOneDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -1]})
  const relativeSquareTwoDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, 1]})
  const relativeSquareThreeDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 1]})

  const rotationTwo = [anchorSquare, relativeSquareOneDown, relativeSquareTwoDown,
    relativeSquareThreeDown]

  const relativeSquareOneLeft = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 0]})
  const relativeSquareTwoLeft = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 0]})
  const relativeSquareThreeLeft = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 1]})

  const rotationThree = [anchorSquare, relativeSquareOneLeft, relativeSquareTwoLeft,
    relativeSquareThreeLeft]

  const relativeSquareOneRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -1]})
  const relativeSquareTwoRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, 1]})
  const relativeSquareThreeRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, -1]})

  const rotationFour= [anchorSquare, relativeSquareOneRight, relativeSquareTwoRight,
    relativeSquareThreeRight]


  const rotations = [rotationOne, rotationTwo, rotationThree, rotationFour]

  const piece = new __WEBPACK_IMPORTED_MODULE_1__piece_js__["a" /* default */]({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#1700FA"})

  return piece
}

/* harmony default export */ __webpack_exports__["a"] = (createReverseLPiece);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(4);






function createReverseZPiece(gameCtx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({center: [4, 1]})
  const relativeSquareOneUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -1]})
  const relativeSquareTwoUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 0]})
  const relativeSquareThreeUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, -1]})

  const rotationOne = [anchorSquare, relativeSquareOneUp,
    relativeSquareTwoUp, relativeSquareThreeUp]

  const relativeSquareOneDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, 1]})
  const relativeSquareTwoDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 0]})
  const relativeSquareThreeDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, -1]})

  const rotationTwo = [anchorSquare, relativeSquareOneDown,
    relativeSquareTwoDown, relativeSquareThreeDown]

  const relativeSquareOneRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 0]})
  const relativeSquareTwoRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, 1]})
  const relativeSquareThreeRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 1]})

  const rotationThree = [anchorSquare, relativeSquareOneRight,
    relativeSquareTwoRight, relativeSquareThreeRight]

  const relativeSquareOneLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 0]})
  const relativeSquareTwoLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -1]})
  const relativeSquareThreeLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 1]})

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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(4);






function createSquarePiece(gameCtx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({center: [4, 1]})
  const relativeSquareOne = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 0]})
  const relativeSquareTwo = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -1]})
  const relativeSquareThree = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, -1]})

  const rotationOne = [anchorSquare, relativeSquareOne, relativeSquareTwo, relativeSquareThree]

  const rotations = [rotationOne]

  const piece = new __WEBPACK_IMPORTED_MODULE_1__piece_js__["a" /* default */]({rotations: rotations, currentRotationIdx: 0,
      vel: 500, anchorSquare: anchorSquare, color: "#F7FF1F" })

  return piece
}

/* harmony default export */ __webpack_exports__["a"] = (createSquarePiece);


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squares_square_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__piece_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squares_null_square_js__ = __webpack_require__(4);






function createZPiece(gameCtx){

  const anchorSquare = new __WEBPACK_IMPORTED_MODULE_2__squares_anchor_square_js__["a" /* default */]({center: [4, 1]})
  const relativeSquareOneUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 0]})
  const relativeSquareTwoUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -1]})
  const relativeSquareThreeUp = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, -1]})

  const rotationOne = [anchorSquare, relativeSquareOneUp,
    relativeSquareTwoUp, relativeSquareThreeUp]

  const relativeSquareOneDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 0]})
  const relativeSquareTwoDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, -1]})
  const relativeSquareThreeDown = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 1]})

  const rotationTwo = [anchorSquare, relativeSquareOneDown,
    relativeSquareTwoDown, relativeSquareThreeDown]

  const relativeSquareOneRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [1, 0]})
  const relativeSquareTwoRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, 1]})
  const relativeSquareThreeRight = new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 1]})

  const rotationThree = [anchorSquare, relativeSquareOneRight,
    relativeSquareTwoRight, relativeSquareThreeRight]

  const relativeSquareOneLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, 0]})
  const relativeSquareTwoLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [-1, -1]})
  const relativeSquareThreeLeft= new __WEBPACK_IMPORTED_MODULE_3__squares_relative_square_js__["a" /* default */]({offset: [0, 1]})

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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var arrayShuffle = __webpack_require__(26),
    baseShuffle = __webpack_require__(29),
    isArray = __webpack_require__(14);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var copyArray = __webpack_require__(27),
    shuffleSelf = __webpack_require__(10);

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
/* 27 */
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
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var shuffleSelf = __webpack_require__(10),
    values = __webpack_require__(30);

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var baseValues = __webpack_require__(31),
    keys = __webpack_require__(33);

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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(32);

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
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(34),
    baseKeys = __webpack_require__(48),
    isArrayLike = __webpack_require__(52);

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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(35),
    isArguments = __webpack_require__(36),
    isArray = __webpack_require__(14),
    isBuffer = __webpack_require__(41),
    isIndex = __webpack_require__(43),
    isTypedArray = __webpack_require__(44);

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
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(37),
    isObjectLike = __webpack_require__(6);

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObjectLike = __webpack_require__(6);

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
/* 38 */
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(11);

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
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(12),
    stubFalse = __webpack_require__(42);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ }),
/* 42 */
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
/* 43 */
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(45),
    baseUnary = __webpack_require__(46),
    nodeUtil = __webpack_require__(47);

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isLength = __webpack_require__(16),
    isObjectLike = __webpack_require__(6);

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
/* 46 */
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(13);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(49),
    nativeKeys = __webpack_require__(50);

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
/* 49 */
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(51);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 51 */
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(53),
    isLength = __webpack_require__(16);

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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObject = __webpack_require__(54);

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
/* 54 */
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