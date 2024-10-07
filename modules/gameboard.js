import Ship from "./ship.js";

export default class Gameboard {
  constructor(board) {
    this.board = board || [];
    if (!this.board.length) {
      this.initialize();
    }
  }

  static ships = {
    carrier: new Ship('Carrier', 5),
    battleship: new Ship('Battleship', 4),
    destroyer: new Ship('Destroyer', 3),
    submarine: new Ship('Submarine', 3),
    patrolBoat: new Ship('Patrol Boat', 2),
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
      this.board[cell].hasShip.hit();
      this.board[cell].hasShip.isSunk();
    }
    this.board[cell].beenHit = true;
  }

  placeShip(ship, cell, xAxis = true) {
    let positionArr = [];
    for (let i = 0; i < ship.size; i++) {
      if (xAxis) {
        // checking for wrap arounds
        if (positionArr[i - 1] % 10 == 9) {
          return false;
        }
        // check if the cell has a ship
        if (this.board[cell + i].hasShip) {
          return false;
        }
        positionArr.push(cell + i);
        this.board[cell + i].hasShip = ship;
  
      } else {
        if (cell + i * 10 >= 100) {
          return false;
        }
        if (this.board[cell + i * 10].hasShip) {
          return false;
        }
        positionArr.push(cell + i * 10);
        this.board[cell + i * 10].hasShip = ship;
      }
    };

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
