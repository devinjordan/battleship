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
    this.board[cell].beenHit = true;

    // TODO: Find the ship on the cell and hit()
  }

  placeShip(ship, cell, xAxis = true) {
    let positionArr = [];
    for (let i = 0; i < ship.size; i++) {
      if (xAxis) {
        if (positionArr[i - 1] % 10 == 9) {
          return;
        }
        positionArr.push(cell + i);
        this.board[cell + i].hasShip = true;
  
      } else {
        if (cell + i * 10 >= 100) {
          return;
        }
        positionArr.push(cell + i * 10);
        this.board[cell + i * 10].hasShip = true;
      }
    };
    ship.position = positionArr;
  }
}
