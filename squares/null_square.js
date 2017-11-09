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

export default nullSquareInstance
