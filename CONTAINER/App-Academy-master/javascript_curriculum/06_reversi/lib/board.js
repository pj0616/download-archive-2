let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let arr = [];

  for (let i=0; i < 8; i++) { 
    arr[i] = new Array(8);
  }

  arr[3][4] = new Piece('black');
  arr[4][3] = new Piece('black');
  arr[3][3] = new Piece('white');
  arr[4][4] = new Piece('white');
  
  return arr;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  const [row, col] = pos;

  if (!this.isValidPos(pos)) { 
    throw Error("Not valid pos!");
  } else { 
    return this.grid[row][col];
  }
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  const validMoves = this.validMoves(color); 

  return validMoves.length === 0 ? false : true;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (this.isOccupied(pos)) { 
    return this.getPiece(pos).color === color;
  } else { 
    return false;
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  const [row, col] = pos;

  return this.grid[row][col] instanceof Piece;
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  const blackMoves = this.validMoves('black'); 
  const whiteMoves = this.validMoves('white'); 

  if (blackMoves.length === 0 && whiteMoves.length === 0) { 
    return true;
  } else { 
    return false;
  }
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  const [row, col] = pos;

  if ((row > 7 || col > 7) || (row < 0 || col < 0)) { 
    return false;
  } else { 
    return true;
  }
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {

  if (!piecesToFlip) { 
    piecesToFlip = [];
  } else { 
    piecesToFlip.push(pos); 
  }

  const [startingRow, startingCol] = pos;
  const [endingRow, endingCol] = dir;

  let newPos = [startingRow + endingRow, startingCol + endingCol];  

  if (!board.isValidPos(newPos)) { 
    return null; 
  } else if (!board.isOccupied(newPos)) { 
    return null;
  } else if (board.isMine(newPos, color)) { 
    return piecesToFlip.length === 0 ? null : piecesToFlip; 
  } else { 
   return _positionsToFlip(board, newPos, color, dir, piecesToFlip);
  }
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  const [row, col] = pos;
  let positionsToFlip = [];
  
  if (!this.validMove(pos, color)) {
    throw new Error('Invalid move!');
  } else { 
    this.grid[row][col] = new Piece(color);
  }

  for (let i = 0; i < Board.DIRS.length; i++) {

    positionsToFlip = positionsToFlip.concat(
      _positionsToFlip(this, pos, color, Board.DIRS[i]) || []
    );
  }

  for (let i = 0; i < positionsToFlip.length; i++) {
    this.getPiece(positionsToFlip[i]).flip();
  }
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  console.log(`${"  "}01234567`);

   for (let i = 0; i < 8; i++) {
     let row = i + " ";

     for (let j = 0; j < 8; j++) {
       let pos = [i, j];
       row +=
         (this.isOccupied(pos) ? this.getPiece(pos).toString() : ".");
     }
     
     console.log(row);
   }
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) { 
    return false; 
  }

  for (let i = 0; i < Board.DIRS.length; i++) { 
    if (_positionsToFlip(this, pos, color, Board.DIRS[i])) { 
      return true; 
    }
  }

  return false;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let validPositions = []; 

  for (let i =0; i < 8; i++) { 
    for (let j =0; j < 8; j++) { 
      let potentialPos = [i,j];
      if (this.validMove(potentialPos, color)) { 
        validPositions.push(potentialPos);
      }
    }
  }

return validPositions;
};

module.exports = Board;
