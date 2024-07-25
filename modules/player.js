import Gameboard from './gameboard.js';

export default class Player {
  constructor(name) {
    this.board = new Gameboard();
    this.ships = [];
    this.name = name;
  }
}