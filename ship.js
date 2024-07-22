export default class Ship {
  constructor(name, size, hits = 0, sunk = false) {
    this.name = name;
    this.size = size;
    this.hits = hits;
    this.sunk = sunk;
  }

  hit() {
    if (this.sunk == true) {
      return;
    }
    this.hits++;
  }

  isSunk() {
    if (this.hits == this.size) {
      this.sunk = true;
    }
    return this.sunk;
  }
}
