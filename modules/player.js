import Gameboard from './gameboard.js';
import Ship from './ship.js';

export default class Player {
  constructor(name) {
    this.board = new Gameboard();
    this.ships = [
      new Ship('Carrier', 5),
      new Ship('Battleship', 4),
      new Ship('Destroyer', 3),
      new Ship('Submarine', 3),
      new Ship('Patrol Boat', 2),
  
    ];
    this.name = name;
  }
}