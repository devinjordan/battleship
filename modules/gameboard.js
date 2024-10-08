import Ship from "./ship.js";

export default class Gameboard {
  constructor(board) {
    this.board = board || [];
    if (!this.board.length) {
      this.initialize();
    }
    this.shipPositions = {};
  }

  occupiedSpaces = [];

  initialize() {
    for (let i = 0; i < 100; i++) {
      this.board.push({
        hasShip: false,
        beenHit: false,
      });
    }
  }

  hitCell(cell) {
    if (this.board[cell].beenHit) {
      return false;
    }
    if (this.board[cell].hasShip) {
      this.shipPositions[cell].hit();
      return true;
    }
    this.board[cell].beenHit = true;
    return false;
  }

  placeShip(execute, ship, cell, xAxis = true) {
    let positionArr = [];
  
    // Check if the ship can be placed without wrapping around or overflowing
    if (xAxis) {
      if (cell % 10 + ship.size > 10) {
        positionArr.push(cell, cell + ship.size);
        return false;
      }
    } else {
      if (Math.floor(cell / 10) + ship.size > 10) {
        positionArr.push(cell, cell + (ship.size - 1) * 10);
        return false;
      }
    }
  
    // Check if all cells in the ship's path are free
    for (let i = 0; i < ship.size; i++) {
      if (xAxis) {
        if (this.board[cell + i].hasShip) {
          positionArr.push(cell, cell + ship.size);
          return false;
        }
      } else {
        if (this.board[cell + i * 10].hasShip) {
          positionArr.push(cell, cell + (ship.size - 1) * 10);
          return false;
        }
      }
    }
  
    // Mark cells as occupied by the ship
    for (let i = 0; i < ship.size; i++) {
      if (xAxis) {
        positionArr.push(cell + i);
        if (execute) {
          this.board[cell + i].hasShip = true;
          this.shipPositions[cell + i] = ship; // Maps cell to ship
        }
      } else {
        positionArr.push(cell + i * 10);
        if (execute) {
          this.board[cell + i * 10].hasShip = true;
          this.shipPositions[cell + i * 10] = ship; // Maps cell to ship
        }
      }
    }

    // do not actually place the ship if just hovering
    if (!execute) {
      return positionArr;
    }
  
    ship.position = positionArr;
    return true;
  }

  setShips(ships = Gameboard.ships) {
    for (let ship in ships) {
      do {
        let cell = prompt('Starting Cell: ');
        let axis = prompt('Axis: ');
        this.placeShip(ship, cell, axis);
      } while (!ship.position);
      this.ships.push(ship);
    }
  }

  allShipsSunk(ships) {
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].sunk == false) {
        return false;
      }
    }
    return true;
  }
}
