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

  placeShip(ship, cell, xAxis = true) {
    let positionArr = [];
    for (let i = 0; i < ship.size; i++) {
      if (xAxis) {
        // checking for wrap arounds
        if (positionArr[i - 1] % 10 == 9) {
          console.log(`Bad placement. ${positionArr}`);
          return false;
        }
        // check if the cell has a ship
        if (this.board[cell + i].hasShip) {
          console.log(`Bad placement. ${positionArr}`);
          return false;
        }
        positionArr.push(cell + i);
        this.board[cell + i].hasShip = true;
        this.shipPositions[cell + i] = ship; // Maps cell to ship
  
      } else {
        if (cell + i * 10 >= 100) {
          console.log(`Bad placement. ${positionArr}`);
          return false;
        }
        if (this.board[cell + i * 10].hasShip) {
          console.log(`Bad placement. ${positionArr}`);
          return false;
        }
        positionArr.push(cell + i * 10);
        this.board[cell + i * 10].hasShip = true;
        this.shipPositions[cell + i * 10] = ship; // Maps cell to ship
      }
    };

    console.log(`placed ${ship.name} at ${positionArr}`);

    // double check full position
    positionArr.forEach(cell => {
      if (this.occupiedSpaces.includes(cell)) {
        return false;
      }  
    });
    ship.position = positionArr;
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
