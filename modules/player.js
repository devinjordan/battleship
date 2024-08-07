import Gameboard from './gameboard.js';

export default class Player {
  constructor(name) {
    this.board = new Gameboard();
    this.ships = [
      Gameboard.ships.carrier,
      Gameboard.ships.battleship,
      Gameboard.ships.destroyer,
      Gameboard.ships.submarine,
      Gameboard.ships.patrolBoat
    ];
    this.name = name;
  }
}